import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { SubCategory } from '../../../models/subcategory';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports:

    [
      MatTableModule, MatButtonModule, CommonModule,
      MatFormFieldModule, ReactiveFormsModule, MatInputModule,
      MatIconModule, MatToolbarModule, MatCheckboxModule, DialogModule,
      MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule
    ],

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'subcategories'];
  dataSource = new MatTableDataSource<Category>();
  isEditMode = false;
  isAddMode = false;
  categoryForm: FormGroup;
  editElement!: Category;
  deleteElement!: Category;
  editElementSelection = false;
  selection = new SelectionModel<Category>(true, []);
  yes = null;
  no = null;
  isLoading = false;

  @ViewChild('categoryAddFormDialogTemplate') categoryAddFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('categoryEditFormDialogTemplate') categoryEditFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('confirmDialogTemplate') confirmDialogTemplate!: TemplateRef<unknown>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private categoryFormDialog: MatDialog,
  ) {

    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      subcategories: this.fb.array([]),
    });

    this.loadCategories();
  }

  get getSubcategories(): FormArray {
    return this.categoryForm.get('subcategories') as FormArray;
  }

  openDialogCategoryAdd() {
    this.categoryFormDialog.open(this.categoryAddFormDialogTemplate,
      {
        width: '600px',
        height: '600px',
      }
    );
    this.toggleAddMode();
  }

  openDialogCategoryEdit() {
    this.categoryFormDialog.open(this.categoryEditFormDialogTemplate,
      {
        width: '600px',
        height: '600px',
      }
    );
    this.toggleEditMode();
  }

  openDeleteConfirmDialog() {
    this.categoryFormDialog.open(this.confirmDialogTemplate, {
      width: '500px',
      height: '230px',
    });

  }

  onCancel(): void {
    this.categoryFormDialog.closeAll();
  }

  onConfirm(): void {
    this.deleteCategory();
    this.categoryFormDialog.closeAll();
    this.selection.clear();
  }

  toggleAddMode() {
    this.isAddMode = !this.isAddMode;
    if (this.isAddMode) {
      this.isEditMode = false;
    };
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.isAddMode = false;
    };
  }

  createSubCategoryGroup(subCategory?: SubCategory): FormGroup {

    return this.fb.group({
      id: [subCategory ? subCategory.id : null],
      name: [subCategory ? subCategory.name : '', [Validators.required, Validators.maxLength(50)]],
      categoryId: [subCategory ? subCategory.categoryId : null]
    })

  }

  editCategory() {

    if (this.isAddMode) {
      this.isAddMode = false;
    }

    this.openDialogCategoryEdit();

    const category = this.editElement;
    this.isEditMode = true;

    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
    });

    const subcategoriesArray = this.categoryForm.get('subcategories') as FormArray;
    subcategoriesArray.clear();

    category.subcategories.forEach(subcategory => {
      const sub = subcategory as unknown as SubCategory;

      subcategoriesArray.push(this.createSubCategoryGroup(sub));

    })

  }

  addSubCategoryControl() {
    const subcategories = this.getSubcategories;

    subcategories.push(this.createSubCategoryGroup());
  }

  removeSubCategory(index: number) {
    const subcategories = this.getSubcategories;
    subcategories.removeAt(index);
  }

  onSubmit() {
  
    if (this.categoryForm.invalid) {
      alert('invalid form');
      this.categoryFormDialog.closeAll();
      this.categoryForm.reset();
      return;
    }

    if (this.isAddMode) {
      this.addCategory();
      this.toggleAddMode();
    }
    else if (this.isEditMode) {
      this.updateCategory();
      this.toggleEditMode();
    }

  }

  addCategory() {

    const formContent = this.categoryForm.value;
    this.isLoading = true;

    this.categoriesService.addCategory(formContent.name)
      .subscribe((data) => {
        const categoryId = data.id;
        const subCategoryObservables = formContent.subcategories.map(
          (subcategory: { name: string }) =>
            this.categoriesService.addSubcategory(categoryId, subcategory.name)
        )

        forkJoin(subCategoryObservables).subscribe(
          () => {
            this.loadCategories();
            this.isLoading = false;
            this.categoryFormDialog.closeAll();
            this.categoryForm.reset();
            this.selection.clear();
            const subcategoriesArray = this.categoryForm.get('subcategories') as FormArray;
            subcategoriesArray.clear()
          },
        );
      });

  }

  updateCategory() {

    const formContent = this.categoryForm.value;
    this.isLoading = true;

    this.categoriesService.updateCategory(formContent.id, formContent.name).subscribe(
      () => {

        const subcategoryObservables = formContent.subcategories.map((subcategory: SubCategory) =>
          this.categoriesService.updateSubcategory(formContent.id, subcategory.id, subcategory.name)
        );

        forkJoin(subcategoryObservables).subscribe(() => {
          this.loadCategories();
          this.isLoading = false;
          this.categoryFormDialog.closeAll();
          this.categoryForm.reset();
          this.selection.clear();
          const subcategoriesArray = this.categoryForm.get('subcategories') as FormArray;
          subcategoriesArray.clear()
        });

      }
    );
  }

  deleteCategory() {
    this.isLoading = true;

    const categoryObservables = this.selectedCategories.map((category: Category) =>
      this.categoriesService.deleteCategory(category.id)
    );

    forkJoin(categoryObservables).subscribe(() => {
      this.loadCategories();
      this.isLoading = false;
      this.selection.clear();
    });
  }

  loadCategories() {
    this.isLoading = true;

    this.categoriesService.getCategories().subscribe((data) => {
      this.dataSource.data = data;
      this.selection.clear();
      this.isLoading = false;

      this.dataSource.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  toggleSelection(category: Category) {
    this.selection.toggle(category);

    if (this.editElementSelection) {
      this.editElementSelection = false;
    } else {
      this.editElementSelection = true;
      this.editElement = this.selection.selected[0];
      this.deleteElement = this.selection.selected[0];
    }

  }

  get selectedCategories(): Category[] {
    return this.selection.selected;

  }

  onPageChange(event: PageEvent) {
    console.log(event.pageIndex);
    //this.loadCategories(event.pageIndex, event.pageSize);
  }

}
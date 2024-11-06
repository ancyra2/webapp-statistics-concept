import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CategoriesService} from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { SubCategory } from '../../../models/subcategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: 
  
  [
    MatTableModule, MatButtonModule, CommonModule, 
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatIconModule
  ],

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'subcategories', 'actions'];
  dataSource!: Category[];
  isEditMode = false;
  isAddMode = false;
  categoryForm: FormGroup;
  editElement!: Category;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
    
    this.categoryForm = this.fb.group({
      id: ['null'],
      name: [''],
      subcategories: this.fb.array([]),
    });

    categoriesService.getCategories().subscribe((data) => {
      this.dataSource = data;
    });
  }

  get getSubcategories(): FormArray {
    return this.categoryForm.get('subcategories') as FormArray;
  }

  toggleAddMode() {
    this.isAddMode = !this.isAddMode;
    if(this.isAddMode){
      this.isEditMode = false;
    };
  }
  
  createSubCategoryGroup(subCategory?: SubCategory): FormGroup{

    return this.fb.group({
      id: [subCategory ? subCategory.id : null],
      name: [subCategory ? subCategory.name : ''],
      categoryId: [subCategory ? subCategory.categoryId: null]
    })

  }

  editCategory(category: Category) {
    this.editElement = category;
    this.isEditMode = true;

    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
    });

    if (this.isAddMode) {
      this.isAddMode = false;
    }

    const subcategoriesArray = this.categoryForm.get('subcategories') as FormArray;
    subcategoriesArray.clear();

    category.subcategories.forEach(subcategory => {
      const sub = subcategory as unknown as SubCategory;
      
      subcategoriesArray.push(this.createSubCategoryGroup(sub));

    })

  }

  addSubCategoryControl(){
    const subcategories = this.getSubcategories;
    this.isAddMode = true;

    if (this.isEditMode) {
      this.isEditMode = false;
    }
  
    subcategories.push(this.createSubCategoryGroup());
  }

  removeSubCategory(index: number){
    const subcategories = this.getSubcategories;
    subcategories.removeAt(index);
  }

  onSubmit() {
    if(this.isAddMode){
      const formContent = this.categoryForm.value;
  
      this.categoriesService.addCategory(formContent.name)
        .subscribe((data) => {
          const categoryId = data.id;
  
          formContent.subcategories.forEach((subcategory: { name: string }) => {
            this.categoriesService.addSubcategory(categoryId, subcategory.name).subscribe();
          });
        });

    }else if(this.isEditMode) {
      const formContent = this.categoryForm.value;
      
      this.categoriesService.updateCategory(formContent.id, formContent.name).subscribe();

      formContent.subcategories.forEach((subcategory: SubCategory) => {
    
        this.categoriesService.updateSubcategory(formContent.id, subcategory.id, subcategory.name).subscribe();
      });
    }
    
  }

}
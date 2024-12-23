import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageService } from '../../../services/page.service';
import { Page } from '../../../models/page';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

export interface ControlObjects{
  type: string;
}

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, CommonModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatIconModule, MatToolbarModule, MatCheckboxModule, DialogModule,
    MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule, MatTabGroup, 
    MatTab, MatMenuModule, MatSelectModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  displayedColumns: string[] = ['select', 'id', 'title', 'slug', 'isPublished', 'publishedAt', 'authorId', 'category', 'tags'];
  dataSource = new MatTableDataSource<Page>();
  isEditMode = false;
  isAddMode = false;
  form: FormGroup;
  editElement!: Page;
  deleteElement!: Page;
  editElementSelection = false;
  selection = new SelectionModel<Page>(true, []);
  yes = null;
  no = null;
  isLoading = false;
  roles = ['Admin', 'User'];
  permissions = ['Read', 'Write'];
  private _snackBar = inject(MatSnackBar);
  controlObjects: ControlObjects[] = [];
  //content: Block[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('AddFormDialogTemplate') AddFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('EditFormDialogTemplate') EditFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('confirmDialogTemplate') confirmDialogTemplate!: TemplateRef<unknown>;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private formDialog: MatDialog,
  ){
    this.form = this.fb.group({
      id:[''],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      authorId: ['', Validators.required],
      isPublished: [false],
      tags: ['', Validators.required],
      category: ['', Validators.required],
      seo: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        keywords: ['', Validators.required],
        canonicalUrl: ['', Validators.required]
      }),
      content: this.fb.array([]),

    });

    this.loadPages();
  }

  get content(): FormArray{
    return this.form.get('content') as FormArray;
  }

  /* isListBlock(block: Block): block is ListBlock {
    return block.type === 'list';
  }

  isParagraph(block: Block): block is ParagraphBlock{
    return block.type === 'paragraph';
  }*/

  /*addParagraph(){
    const newControl = new FormControl('');
    this.content.push(newControl);
    this.listenToSingleControlChanges(newControl, this.content.length - 1);

    this.controlObjects.push({
      type: 'paragraph',
    })

  }

  addHeader(type: string){
    const newControl = new FormControl('');
    this.content.push(newControl);
    this.listenToSingleControlChanges(newControl, this.content.length - 1);

    this.controlObjects.push({
      type: type,
    })

  }

  listenToFormArrayChanges(){
    this.content.controls.forEach((control, index) =>{
      this.listenToSingleControlChanges(control as FormControl, index);
    });
  }

  /*listenToSingleControlChanges(control: FormControl, index: number){
    control.valueChanges.subscribe((control) => {
      
    })
  }
*/
  isHeader(type: string): boolean {
    return ['h1', 'h2', 'h3', 'h4', 'h5'].includes(type);
  }

  get contentControls(){
    return (this.form.get('content') as FormArray).controls;
  }

  addBlock(type: string){
    const blocks = this.form.get('content') as FormArray;
    const block = this.fb.group({
      type: [type, Validators.required],
      data: this.fb.group({
        text: [''], // Varsayılan olarak "text" alanı, blok türüne göre değişir
        level: [1], // Başlık seviyeleri için
        src: [''], // Resimler için
        alt: [''], // Resim açıklamaları
        url: [''], // Videolar için
        items: this.fb.array([]) // Listeler için
      })
    });
    blocks.push(block);
  }

  addListItem(blockIndex: number){
    const blocks = this.form.get('content') as FormArray;
    const block = blocks.at(blockIndex);
    const items = block.get('data.items') as FormArray;
    items.push(this.fb.control(''));
  }

  loadPages() {
    this.isLoading = true;

    this.pageService.getPages().subscribe((data) =>{
      this.dataSource.data = data;
      this.isLoading = false;
      this.selection.clear();
    });
  }

  isAllSelected(): boolean{
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected(): boolean{
    return this.selection.selected.length > 0;
  }

  masterToggle(): void{
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  toggleSelection(page: Page): void{
    this.selection.toggle(page);

    if (this.editElementSelection) {
      this.editElementSelection = false;
    } else {
      this.editElementSelection = true;
      this.editElement = this.selection.selected[0];
      this.deleteElement = this.selection.selected[0];
    }

  }

  onPageChange(event: PageEvent) {
    console.log(event.pageIndex);
  }
  
  onCancel(): void {
    this.formDialog.closeAll();
  }

  onConfirm(): void {
    this.deleteUser();
    this.formDialog.closeAll();
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
  
  get rolesFormArray() {
    return this.form.get('roles') as FormArray;
  }

  get permissionsFormArray() {
    return this.form.get('permissions') as FormArray;
  }

  get selectedUsers(): Page[] {
    return this.selection.selected;
  }

  openDialogAdd() {
    this.form.reset();
    this.formDialog.open(this.AddFormDialogTemplate,
      {
        width: '1000px',
        height: '800px',
        maxWidth: 'none', 
        maxHeight: 'none',
      }
    );
    this.toggleAddMode();
  }

  openDialogEdit() {
    this.form.reset();
    this.formDialog.open(this.EditFormDialogTemplate,
      {
        width: '600px',
        height: '600px',
      }
    );
    this.toggleEditMode();
  }

  openDeleteConfirmDialog() {
    this.formDialog.open(this.confirmDialogTemplate, {
      width: '500px',
      height: '230px',
    });

  }

  onSubmit() {
  
    if (this.form.invalid) {
      alert('invalid form');
      this.formDialog.closeAll();
      this.form.reset();
      return;
    }

    if (this.isAddMode) {
      this.addPage();
      this.toggleAddMode();
    }
    else if (this.isEditMode) {
      this.updatePage();
      this.toggleEditMode();
    }

  }
  
  addPage() {

    const payload = this.form.value;
    this.isLoading = true;

    this.pageService.addPage(payload).subscribe({
      next: () => {
        this.loadPages();
        this._snackBar.open('Kullanıcı başarıyla eklendi', 'Kapat', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Kullanıcı eklenirken bir hata oluştu!', 'Kapat', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
        this.formDialog.closeAll();
        this.form.reset()
      }
    });

  }

  updatePage() {

    const payload = this.form.value;
    this.isLoading = true;

    this.pageService.updatePage(payload).subscribe({
      next: () => {
        this.loadPages();
        this._snackBar.open('Kullanıcı başarıyla güncellendi', 'Kapat', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Kullanıcı güncellenirken bir hata oluştu!', 'Kapat', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
        this.formDialog.closeAll();
        this.form.reset();
      }
    });
  }

  deleteUser() {
    this.isLoading = true;
    
    const deleteRequests = this.selectedUsers.map((page: Page) => 
      this.pageService.deletePage(page.id)
    );

    forkJoin([...deleteRequests]).subscribe({
      next: () => {
        this.loadPages();
        this._snackBar.open('Kullanıcı başarıyla silindi', 'Kapat', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Kullanıcı silinirken bir hata oluştu!', 'Kapat', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
        this.selection.clear();
      }

    })

  }

  editUser() {
    if (this.isAddMode) {
      this.isAddMode = false;
    }
    
    this.openDialogEdit();

    //const page = this.editElement;
    this.isEditMode = true;

    /*this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions
    })*/
    
  }
}

import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../models/user';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, CommonModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatIconModule, MatToolbarModule, MatCheckboxModule, DialogModule,
    MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['select', 'id', 'username', 'email', 'roles', 'permissions'];
  dataSource = new MatTableDataSource<User>();
  isEditMode = false;
  isAddMode = false;
  userForm: FormGroup;
  editElement!: User;
  deleteElement!: User;
  editElementSelection = false;
  selection = new SelectionModel<User>(true, []);
  yes = null;
  no = null;
  isLoading = false;
  roles = ['Admin', 'User'];
  permissions = ['Read', 'Write'];
  private _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('userAddFormDialogTemplate') userAddFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('userEditFormDialogTemplate') userEditFormDialogTemplate!: TemplateRef<unknown>;
  @ViewChild('confirmDialogTemplate') confirmDialogTemplate!: TemplateRef<unknown>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userFormDialog: MatDialog,
  ){
    this.userForm = this.fb.group({
      id:[''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*')
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      roles: this.fb.array(this.roles.map(() => this.fb.control(false))),
      permissions: this.fb.array(this.permissions.map(() => this.fb.control(false))),
    });

    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;

    this.userService.getUsers().subscribe((data) =>{
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

  toggleSelection(user: User): void{
    this.selection.toggle(user);

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
    //this.loadCategories(event.pageIndex, event.pageSize);
  }
  
  onCancel(): void {
    this.userFormDialog.closeAll();
  }

  onConfirm(): void {
    this.deleteUser();
    this.userFormDialog.closeAll();
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
    return this.userForm.get('roles') as FormArray;
  }

  get permissionsFormArray() {
    return this.userForm.get('permissions') as FormArray;
  }

  get selectedUsers(): User[] {
    return this.selection.selected;
  }

  openDialogUserAdd() {
    this.userForm.reset();
    this.userFormDialog.open(this.userAddFormDialogTemplate,
      {
        width: '600px',
        height: '600px',
      }
    );
    this.toggleAddMode();
  }

  openDialogUserEdit() {
    this.userForm.reset();
    this.userFormDialog.open(this.userEditFormDialogTemplate,
      {
        width: '600px',
        height: '600px',
      }
    );
    this.toggleEditMode();
  }

  openDeleteConfirmDialog() {
    this.userFormDialog.open(this.confirmDialogTemplate, {
      width: '500px',
      height: '230px',
    });

  }

  onSubmit() {
  
    if (this.userForm.invalid) {
      alert('invalid form');
      this.userFormDialog.closeAll();
      this.userForm.reset();
      return;
    }

    if (this.isAddMode) {
      this.addUser();
      this.toggleAddMode();
    }
    else if (this.isEditMode) {
      this.updateUser();
      this.toggleEditMode();
    }

  }
  
  addUser() {

    const userPayload = this.userForm.value;
    this.isLoading = true;

    this.userService.addUser(userPayload).subscribe({
      next: () => {
        this.loadUsers();
        this._snackBar.open('Kullanıcı başarıyla eklendi', 'Kapat', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Kullanıcı eklenirken bir hata oluştu!', 'Kapat', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
        this.userFormDialog.closeAll();
        this.userForm.reset()
      }
    });

  }

  updateUser() {

    const userPayload = this.userForm.value;
    this.isLoading = true;

    this.userService.updateUser(userPayload).subscribe({
      next: () => {
        this.loadUsers();
        this._snackBar.open('Kullanıcı başarıyla güncellendi', 'Kapat', { duration: 3000 });
      },
      error: (error) => {
        console.error(error);
        this._snackBar.open('Kullanıcı güncellenirken bir hata oluştu!', 'Kapat', { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
        this.userFormDialog.closeAll();
        this.userForm.reset();
      }
    });
  }

  deleteUser() {
    this.isLoading = true;
    
    const deleteRequests = this.selectedUsers.map((user: User) => 
      this.userService.deleteUser(user.id)
    );

    forkJoin([...deleteRequests]).subscribe({
      next: () => {
        this.loadUsers();
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
    
    this.openDialogUserEdit();

    const user = this.editElement;
    this.isEditMode = true;

    this.userForm.patchValue({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions
    })
    
  }
  
}

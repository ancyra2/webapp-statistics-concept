import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

const ELEMENT_DATA = [
  { id: 1, name: 'Sayfa 1' },
  { id: 2, name: 'Sayfa 2' },
  { id: 3, name: 'Sayfa 3' },
  { id: 4, name: 'Sayfa 4' },
  { id: 5, name: 'Sayfa 5' },
  { id: 6, name: 'Sayfa 1' },
  { id: 7, name: 'Sayfa 2' },
  { id: 8, name: 'Sayfa 3' },
  { id: 9, name: 'Sayfa 4' },
  { id: 10, name: 'Sayfa 5' },
  { id: 11, name: 'Sayfa 1' },
  { id: 12, name: 'Sayfa 2' },
  { id: 13, name: 'Sayfa 3' },
  { id: 14, name: 'Sayfa 4' },
  { id: 15, name: 'Sayfa 5' },
];

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    MatPaginatorModule, MatFormFieldModule, MatIconModule,
    MatTableModule, MatSortModule, MatInputModule, CommonModule,
    MatSelectModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})

export class PagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA); // Örnek veri
  showFormContainer = true; // Form görünürlüğü kontrolü için boolean değişken
  pageForm: FormGroup;
  activeFormIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder) {
    this.pageForm = this.fb.group({
      
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement && inputElement.value) {
      this.dataSource.filter = inputElement.value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  edit(element: Element) {
    console.log('Düzenleniyor:', element);
  }

  delete(element: Element) {
    console.log('Siliniyor:', element);
  }

  showForm() {
    this.showFormContainer = !this.showFormContainer;
  }
  closeForm() {
    this.showFormContainer = !this.showFormContainer;
  }

  setActiveButton(index: number){
    this.activeFormIndex = index;
  }
}

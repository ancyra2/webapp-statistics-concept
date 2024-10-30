import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CategoriesService } from '../../../services/categories.service';

export interface Categories {
  id: number;
  name: string;
  subcategories: string[]; 
}

const ELEMENT_DATA: Categories[] = [
  { id: 1, name: 'World', subcategories: ['Politics', 'Economy', 'Culture']},
  { id: 2, name: 'Football', subcategories: ['Premier League', 'La Liga', 'Serie A'] },
  { id: 3, name: 'Stock Market', subcategories: ['NASDAQ', 'NYSE', 'DAX'] },
  { id: 4, name: 'Technology', subcategories: ['AI', 'Blockchain', 'Cybersecurity'] },
  { id: 5, name: 'Health', subcategories: ['Nutrition', 'Diseases', 'Mental Health'] },
  { id: 6, name: 'Science', subcategories: ['Physics', 'Chemistry', 'Biology'] },
  { id: 7, name: 'Travel', subcategories: ['Destinations', 'Tips', 'Guides'] },
  { id: 8, name: 'Entertainment', subcategories: ['Movies', 'Music', 'TV Shows'] },
];

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
  dataSource = ELEMENT_DATA;
  isEditMode = false;
  isAddMode = false;
  categoryForm: FormGroup;
  editElement!: Categories;

  constructor(private fb: FormBuilder, categoriesService: CategoriesService) {
    
    this.categoryForm = this.fb.group({
      name: [''],
      subcategories: this.fb.array([]),
    });

    categoriesService.getCategories();
  }

  editCategory(element: Categories) {
    this.editElement = element;
    this.isEditMode = true;

    // Formu güncelle
    this.categoryForm.patchValue({
      name: element.name,
    });

    if (this.isAddMode) {
      this.isAddMode = false;
    }

    // Alt kategorileri güncelle
    const subcategoriesArray = this.categoryForm.get('subcategories') as FormArray;
    subcategoriesArray.clear(); // Mevcut kontrolleri temizle

    element.subcategories.forEach(subcategory => {
      subcategoriesArray.push(new FormControl(subcategory));
    });
  }

  addSubCategory(){
    const subcategories = this.getSubcategories;
    this.isAddMode = true;

    if (this.isEditMode) {
      this.isEditMode = false;
    }
  
    subcategories.push(new FormControl(''));
  }

  removeSubCategory(index: number){
    const subcategories = this.getSubcategories;
    subcategories.removeAt(index);
  }

  // FormArray'yi döndüren bir yardımcı fonksiyon
  get getSubcategories(): FormArray {
    return this.categoryForm.get('subcategories') as FormArray;
  }

  onSubmit() {
    console.log('Form data:', this.categoryForm.value);
  }
}
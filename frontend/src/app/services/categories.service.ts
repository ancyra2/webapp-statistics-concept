import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../custom-configs/api/endpoints.enum';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private configService: ConfigService, private http: HttpClient) { 
   
  }

  getCategories(): Observable<Category[]> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.CATEGORIES);

    return this.http.get<Category[]>(url);
  }

  addCategory(name: string): Observable<Category> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.CATEGORIES);

    return this.http.post<Category>(url,
      {
        name: name
      }
    )

  }

  updateCategory(id: number, name: string) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.CATEGORIES);

    return this.http.patch<Category>(url + '/' + id, 
      {
        name: name
      }
    )

  }

  deleteCategory(id: number) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.CATEGORIES);

    return this.http.delete<Category>(url + '/' + id);
  }

  addSubcategory(categoryId: number, name: string)  {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.SUBCATEGORIES, { categoryId: categoryId});
    return this.http.post(url, 
      {
        name: name
      }
    )

  }

  updateSubcategory(categoryId: number, subcategoryId: number, name: string) {

    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.SUBCATEGORIES, { categoryId: categoryId });
    
    return this.http.patch(url + '/' + subcategoryId, 
      {
        name: name,
        categoryId: categoryId
      }
    )

  }

  deleteSubcategory(categoryId: number, subcategoryId: number) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.SUBCATEGORIES, { categoryId: categoryId });

    return this.http.delete(url + '/' + subcategoryId);
  }

}
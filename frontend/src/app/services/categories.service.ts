import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../custom-configs/api/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private configService: ConfigService, private http: HttpClient) { 
   
  }

  async getCategories() {
    this.http.get(this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.CATEGORIES)).subscribe((data) => {
      console.log(data);
    })
  }

}
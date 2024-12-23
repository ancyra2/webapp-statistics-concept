import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';
import { ApiEndpoints } from '../../../custom-configs/api/endpoints.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getPage(id: number): Observable<Page> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.PAGES);

    return this.http.get<Page>(url + '/' + id);
  }

  getPages(): Observable<Page[]> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.PAGES);

    return this.http.get<Page[]>(url);
  }

  addPage(page: Page): Observable<Page> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.PAGES);

    return this.http.post<Page>(url, page);
  }

  updatePage(page: Page) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.PAGES);
    console.log(page);
    return this.http.patch<Page>(url + '/' + page.id, page);
  }

  deletePage(id: number) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.PAGES);

    return this.http.delete<Page>(url + '/' + id);
  }

}

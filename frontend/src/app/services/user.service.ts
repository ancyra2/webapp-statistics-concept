import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../custom-configs/api/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.USERS);

    return this.http.get<User>(url + '/' + id);
  }

  getUsers(): Observable<User[]> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.USERS);

    return this.http.get<User[]>(url);
  }

  addUser(user: User): Observable<User> {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.USERS);

    return this.http.post<User>(url, user);
  }

  updateUser(user: User) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.USERS);
    console.log(user);
    return this.http.patch<User>(url + '/' + user.id, user);
  }

  deleteUser(id: number) {
    const url = this.configService.apiConfig.apiUrl + this.configService.apiConfig.getEndPoint(ApiEndpoints.USERS);

    return this.http.delete<User>(url + '/' + id);
  }

}

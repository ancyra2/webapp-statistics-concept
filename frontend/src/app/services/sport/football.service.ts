import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService{
  private apiUrl = 'http://api.football-data.org/v4/areas/';
  private apiToken = 'd2c901345c394824b7c2240f2ea155a0';
  constructor(private http: HttpClient) { }

  getPersonData(): Observable<any>{
    const headers = new HttpHeaders({
      'X-Auth-Token': this.apiToken
    });
    return this.http.get(this.apiUrl, { headers });
  }

}

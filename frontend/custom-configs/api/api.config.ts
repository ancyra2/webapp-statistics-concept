import { Injectable } from "@angular/core";
import { Environment } from "../../environments/environment"
import { ApiEndpoints } from "./endpoints.enum";

@Injectable({
  providedIn: 'root', // Bu, ApiConfig'in kök uygulama modülünde sağlandığı anlamına gelir.
})
  
export class ApiConfig{
  public readonly apiBaseUrl = Environment.apiUrl;

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  getEndPoint(endpoint: ApiEndpoints, params?: Record<string, string | number>): string {
    let url = endpoint as string;

    if (params) {
      Object.keys(params).forEach((key) => {
        url = url.replace(`{${key}}`, params[key].toString());
      })
    }
    return url;
  }
}
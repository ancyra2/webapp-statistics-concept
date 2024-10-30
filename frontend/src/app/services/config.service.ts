import { Injectable } from '@angular/core';
import { ApiConfig } from '../../../custom-configs/api/api.config';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiConfig: ApiConfig;

  constructor(apiConfig: ApiConfig) {
    this.apiConfig = apiConfig;
  }
}

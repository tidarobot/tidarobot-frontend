import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINTS} from '../../shared/api-endpoints';
import {AuthResponse} from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
  }

  register(data: any) {
    return this.http.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
  }
}

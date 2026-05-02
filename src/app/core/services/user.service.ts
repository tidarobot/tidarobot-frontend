import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  update(data: { email?: string; password?: string }) {
    return this.http.patch<User>(API_ENDPOINTS.USERS.UPDATE, data);
  }

  delete() {
    return this.http.delete(API_ENDPOINTS.USERS.DELETE, { observe: 'response' });
  }
}
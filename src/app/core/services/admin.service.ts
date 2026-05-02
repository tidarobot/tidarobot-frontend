import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { User } from '../models/user';
import { Page } from '../models/page';

export interface UserFilter {
  page?: number;
  size?: number;
  sort?: string;
  role?: string;
  status?: string;
  username?: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsers(filter: UserFilter = {}) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        params = params.set(k, String(v));
      }
    });
    return this.http.get<Page<User>>(API_ENDPOINTS.ADMIN.USERS, { params });
  }

  updateStatus(id: number, status: string) {
    const params = new HttpParams().set('status', status);
    return this.http.patch(API_ENDPOINTS.ADMIN.USER_STATUS(id), null, { params });
  }
}
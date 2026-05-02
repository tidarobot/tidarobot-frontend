import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { Page } from '../models/page';
import { DayRanking, FloorRanking, UserRanking } from '../models/stats';

export interface StatsFilter {
  page?: number;
  size?: number;
  sort?: string;
  city?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  constructor(private http: HttpClient) {}

  private toParams(filter: StatsFilter): HttpParams {
    let params = new HttpParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        params = params.set(k, String(v));
      }
    });
    return params;
  }

  getDays(filter: StatsFilter = {}) {
    return this.http.get<Page<DayRanking>>(API_ENDPOINTS.STATS.DAYS, { params: this.toParams(filter) });
  }

  getUsers(filter: StatsFilter = {}) {
    return this.http.get<Page<UserRanking>>(API_ENDPOINTS.STATS.USERS, { params: this.toParams(filter) });
  }

  getFloors(filter: StatsFilter = {}) {
    return this.http.get<Page<FloorRanking>>(API_ENDPOINTS.STATS.FLOORS, { params: this.toParams(filter) });
  }
}
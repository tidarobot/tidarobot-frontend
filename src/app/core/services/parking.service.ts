import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { CreateReservationRequest, ParkingReservation } from '../models/parking-reservation';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  constructor(private http: HttpClient) {}

  create(data: CreateReservationRequest) {
    return this.http.post<ParkingReservation>(API_ENDPOINTS.PARKING.RESERVATIONS, data);
  }

  getLatest() {
    return this.http.get<ParkingReservation[]>(API_ENDPOINTS.PARKING.RESERVATIONS);
  }

  getHistory(page = 0, size = 10) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'createdAt,desc');
    return this.http.get<Page<ParkingReservation>>(API_ENDPOINTS.PARKING.HISTORY, { params });
  }

  cancel(id: number) {
    return this.http.delete(API_ENDPOINTS.PARKING.RESERVATION(id), { observe: 'response' });
  }
}
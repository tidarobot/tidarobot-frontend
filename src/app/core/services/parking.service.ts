import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../shared/api-endpoints';
import { CreateReservationRequest, ParkingReservation } from '../models/parking-reservation';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  constructor(private http: HttpClient) {}

  create(data: CreateReservationRequest) {
    return this.http.post<ParkingReservation>(API_ENDPOINTS.PARKING.RESERVATIONS, data);
  }

  getOwn() {
    return this.http.get<ParkingReservation[]>(API_ENDPOINTS.PARKING.RESERVATIONS);
  }

  cancel(id: number) {
    return this.http.delete(API_ENDPOINTS.PARKING.RESERVATION(id), { observe: 'response' });
  }
}
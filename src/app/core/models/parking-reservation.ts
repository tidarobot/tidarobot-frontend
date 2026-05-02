export type City = 'CRACOW' | 'WARSAW';
export type Floor = 'MINUS_1' | 'MINUS_2' | 'OUTDOOR';
export type ReservationStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface ParkingReservation {
  id: number;
  username: string;
  city: City;
  floor: Floor;
  targetDate: string;
  scheduledFor: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface CreateReservationRequest {
  city: City;
  floor: Floor;
  targetDate: string;
}
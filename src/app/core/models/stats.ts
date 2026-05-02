export interface DayRanking {
  targetDate: string;
  reservationCount: number;
}

export interface UserRanking {
  userId: number;
  username: string;
  reservationCount: number;
}

export interface FloorRanking {
  floor: string;
  reservationCount: number;
}
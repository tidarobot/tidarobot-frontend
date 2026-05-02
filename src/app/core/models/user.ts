export type Role = 'USER' | 'ADMIN';
export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}
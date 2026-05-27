const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`
  },
  USERS: {
    UPDATE: `${BASE_URL}/users/update`,
    DELETE: `${BASE_URL}/users`
  },
  ADMIN: {
    USERS: `${BASE_URL}/admin/users`,
    USER_STATUS: (id: number) => `${BASE_URL}/admin/users/${id}`
  },
  PARKING: {
    RESERVATIONS: `${BASE_URL}/parking/reservations`,
    HISTORY: `${BASE_URL}/parking/reservations/history`,
    RESERVATION: (id: number) => `${BASE_URL}/parking/reservations/${id}`
  },
  STATS: {
    DAYS: `${BASE_URL}/stats/days`,
    USERS: `${BASE_URL}/stats/users`,
    FLOORS: `${BASE_URL}/stats/floors`
  }
};

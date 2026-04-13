const baseUrl = 'http://localhost:8080/api';

export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: `${baseUrl}/auth/login`,
    REGISTER: `${baseUrl}/auth/register`
  },

  USERS: {
    ME: `${baseUrl}/users/me`,
    UPDATE: `${baseUrl}/users/update`
  }

};

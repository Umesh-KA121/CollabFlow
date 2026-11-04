import axios from 'axios';

import { env } from '../config/env';

export const api = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('API is not reachable');
      } else {
        console.error('Request configuration error:', error.message);
      }
    }

    return Promise.reject(error);
  },
);

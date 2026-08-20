import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'حدث خطأ في الاتصال بالخادم';
    return Promise.reject(new Error(message));
  }
);

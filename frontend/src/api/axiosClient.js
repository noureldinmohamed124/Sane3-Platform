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
    let message = '';
    const data = error.response?.data;

    if (typeof data === 'string' && data.trim()) {
      message = data.trim();
    } else if (data && typeof data === 'object') {
      if (data.message) {
        message = data.message;
      } else if (data.errors && typeof data.errors === 'object') {
        const errorEntries = Object.entries(data.errors).map(([key, val]) => {
          const valStr = Array.isArray(val) ? val.join(', ') : String(val);
          return `${key}: ${valStr}`;
        });
        message = errorEntries.join(' | ');
      } else if (data.title) {
        message = data.title;
      }
    }

    if (!message) {
      message = error.message || 'حدث خطأ أثناء معالجة الطلب، يرجى المحاولة مرة أخرى.';
    }

    return Promise.reject(new Error(message));
  }
);

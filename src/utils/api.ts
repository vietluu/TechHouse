import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}`,
  validateStatus: (status) => {
    return status >= 200 && status <= 500;
  },
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

api.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (typeof token !== 'string') token = null;

    if (token) config.headers['Authorization'] = 'Bearer ' + token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { api };

import axios from 'axios';
import { getCookie ,setCookie} from 'cookies-next';
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

    if (token) config.headers["Authorization"] = 'Bearer ' + token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
const getData = async () => {
  // const nextCookies = cookies(); // Get cookies object
  const token = getCookie('cookieToken') // Find cookie
  console.log(token)
   const res = await api.get(`${process.env.NEXT_PUBLIC_URL}/auth/profile`, {
  headers: {
    Authorization: 'BEARER ' + token
  }
}
   )
  if (res.status == 401) {
    let rf_token = getCookie('cookieToken')
    const res = await api.post(`${process.env.NEXT_PUBLIC_URL}/auth/refresh-token`, { refreshToken: rf_token })
    console.log(res.data)
    if (res.data.access_token) {
      console.log(res.data.refresh_token)
      if (typeof window !== 'undefined'){
      localStorage?.setItem('token', res.data.access_token);
      localStorage?.setItem('rf_token', res.data.refresh_token);
      }
      setCookie('Token', res.data.access_token);
      setCookie('cookieToken', res.data.refresh_token);
    
    }
  }
  console.log(res.status)
  return res.data 
}
export { api ,getData };

import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export default api;

import axios from 'axios';
import auth from '@/auth';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = auth.getAccessKey()
  return config;
});

export default {
  get(endpoint) {
    return instance.get(endpoint);
  },
  post(endpoint, data) {
    return instance.post(endpoint, data);
  },
  put(endpoint, data) {
    return instance.put(endpoint, data);
  },
  delete(endpoint) {
    return instance.delete(endpoint);
  },
};

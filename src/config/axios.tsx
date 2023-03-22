import Axios from 'axios';

const Api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use((config) => {
  const _token = localStorage.getItem('@token');
  if (_token && config.headers) {
    config.headers.authorization = 'Bearer ' + _token;
  }
  return config;
});

Api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error && error.response) {
      return error.response;
    }
    return { status: 500, data: null };
  }
);

export default Api;

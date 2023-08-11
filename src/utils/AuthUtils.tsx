import jwtDecode from 'jwt-decode';
import {getStringFromsaveToMMKVStorage, saveToMMKVStorage} from './MMKVStorage';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosStatic,
} from 'axios';
import {BASE_URL} from '@env';
import authService from 'api/auth';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export function setupAxios(axios: AxiosStatic) {
  axios.defaults.headers.Accept = 'application/json';
  axios.defaults.baseURL = BASE_URL;
  axios.interceptors.request.use(onRequest, (error: AxiosError) =>
    Promise.reject(error),
  );
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    onResponseError,
  );
}

const onRequest = (config: AdaptAxiosRequestConfig) => {
  const accessToken = getStringFromsaveToMMKVStorage('access_token');
  if (accessToken) {
    const {exp} = jwtDecode<{
      exp: number;
    }>(accessToken);

    const expirationTime = exp * 1000;
    if (Date.now() < expirationTime) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
  }

  return config;
};

const onResponseError = async (
  error: AxiosError<{
    message: string;
  }>,
) => {
  if (
    error.response?.status === 401 &&
    error.response.data.message === 'Unauthorized'
  ) {
    const config = error.config;
    const refreshToken = getStringFromsaveToMMKVStorage('refresh_token');
    if (refreshToken) {
      const data = await authService.refreshTokenApi(refreshToken ?? '');
      if (data?.access_token) {
        config!.headers.Authorization = `Bearer ${data.access_token}`;
        saveToMMKVStorage('access_token', data.access_token);
      }
      return axios.request(config as AdaptAxiosRequestConfig);
    }
  }
  return Promise.reject(error);
};

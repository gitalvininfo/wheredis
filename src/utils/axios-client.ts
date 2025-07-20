import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const apiRequest = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError<{ message: string }>) =>
    Promise.reject(error);

  return apiClient(options).then(onSuccess).catch(onError);
};

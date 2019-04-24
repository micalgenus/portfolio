import axios, { AxiosRequestConfig } from 'axios';

export const RETRY_MAX = 2;

export const axiosRetryWrapper = async (axiosOptions: AxiosRequestConfig, retry?: number): Promise<any> => {
  const count: number = retry || RETRY_MAX;
  if (count <= 1) return axios(axiosOptions);

  return axios(axiosOptions).catch(() => axiosRetryWrapper(axiosOptions, count - 1));
};

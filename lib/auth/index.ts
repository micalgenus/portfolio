import axios from 'axios';
import getConfig from 'next/config';

// import { axiosRetryWrapper } from '@/lib/config';

const { publicRuntimeConfig } = getConfig();

export const requestOAuthWithAxiosRetry = async (type: string, code: string): Promise<any> => {
  // return axiosRetryWrapper({
  return axios({
    method: 'POST',
    url: publicRuntimeConfig.PORTFOLIO_OAUTH_URL,
    params: { type, code },
  }).then(res => {
    if (res.data.error) return Promise.reject(res.data.error);
    return Promise.resolve(res.data);
  });
};

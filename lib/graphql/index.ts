import axios from 'axios';
import getConfig from 'next/config';
import { getLoginToken } from '@/lib/utils/cookie';

const { publicRuntimeConfig } = getConfig();

export const requestGraphqlWithAxios = async (body: string) =>
  axios({
    method: 'POST',
    url: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL,
    headers: { 'x-access-token': getLoginToken() },
    data: { query: body },
  }).then(res => {
    if (res.data.errors) return Promise.reject(res.data.errors);
    return Promise.resolve(res.data.data);
  });

export { default as ApolloClientProvider } from './apollo';
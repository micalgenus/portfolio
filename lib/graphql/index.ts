import axios from 'axios';
import getConfig from 'next/config';
import { getLoginToken } from '@/lib/utils/cookie';

const { publicRuntimeConfig } = getConfig();

export const requestGraphqlWithAxios = async (body: string, variables?: object) =>
  axios({
    method: 'POST',
    url: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL,
    headers: { 'x-access-token': getLoginToken() },
    data: { query: body, variables },
  }).then(res => {
    if (res.data.errors) return Promise.reject(res.data.errors);
    return Promise.resolve(res.data.data);
  });

export const gql = (query: TemplateStringsArray) => query.join('');

export { default as ApolloClientProvider } from './apollo';

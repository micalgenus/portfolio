import axios from 'axios';
import getConfig from 'next/config';
import { getLoginToken } from '@/lib/utils/cookie';

const { publicRuntimeConfig } = getConfig();

export const RETRY_MAX = 3;

export const requestGraphqlWithAxiosRetry = async (body: string, variables?: object, retry?: number): Promise<any> => {
  const count: number = retry || RETRY_MAX;
  if (count <= 1) return requestGraphqlWithAxios(body, variables);

  return requestGraphqlWithAxios(body, variables).catch(() => requestGraphqlWithAxiosRetry(body, variables, count - 1));
};

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

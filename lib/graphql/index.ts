import getConfig from 'next/config';

import { getLoginToken } from '@/lib/utils/cookie';
import { axiosRetryWrapper } from '@/lib/config';

const { publicRuntimeConfig } = getConfig();

export const requestGraphqlWithAxiosRetry = async (body: string, variables?: object): Promise<any> => {
  return axiosRetryWrapper({
    method: 'POST',
    url: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL,
    headers: { 'x-access-token': getLoginToken() },
    data: { query: body, variables },
  }).then(res => {
    if (res.data.errors) return Promise.reject(res.data.errors);
    return Promise.resolve(res.data.data);
  });
};

export const gql = (query: TemplateStringsArray) => query.join('');

export { default as ApolloClientProvider } from './apollo';

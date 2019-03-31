import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

import { getLoginToken } from '@/lib/utils/cookie';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const httpLink = createHttpLink({ uri: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL, fetch });
const retryLink = new RetryLink({
  delay: { initial: 300, max: Infinity, jitter: true },
  attempts: { max: 5, retryIf: (error, _operation) => !!error },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { 'x-access-token': getLoginToken() } });

  if (forward) return forward(operation);
  return null;
});

const client = new ApolloClient({
  link: concat(authMiddleware, concat(retryLink, httpLink)),
  cache: new InMemoryCache(),
});

export default class ApolloClientProvider extends Component {
  render() {
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}

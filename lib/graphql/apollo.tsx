import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

import { getLoginToken } from '@/lib/utils/cookie';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const httpLink = createHttpLink({ uri: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL, fetch });
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { 'x-access-token': getLoginToken() } });

  if (forward) return forward(operation);
  return null;
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default class ApolloClientProvider extends Component {
  render() {
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}

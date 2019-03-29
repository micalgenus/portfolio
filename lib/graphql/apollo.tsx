import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const client = new ApolloClient({
  link: createHttpLink({ uri: publicRuntimeConfig.PORTFOLIO_GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});

export default class ApolloClientProvider extends Component {
  render() {
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}

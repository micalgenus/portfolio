import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  link: createHttpLink({ uri: process.env.PORTFOLIO_GRAPHQL_URL, fetch }),
  cache: new InMemoryCache(),
});

export default class ApolloClientProvider extends Component {
  render() {
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>;
  }
}

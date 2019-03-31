import React, { Component } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Router } from '@/components';

export const graqhqlQuery = gql`
  query {
    me {
      username
      email
    }
  }
`;

export default class ProfilePage extends Component {
  renderProfile = (username: string, email: string) => (
    <div>
      {username}
      {email}
    </div>
  );

  render() {
    return (
      <Query query={graqhqlQuery}>
        {({ loading, error, data }) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          const { me } = data;

          return <div>{this.renderProfile(me.username, me.email)}</div>;
        }}
      </Query>
    );
  }
}

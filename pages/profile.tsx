import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

import { Button } from 'semantic-ui-react';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';
import { Router, InputText, TextArea } from '@/components';

const graqhqlQuery = gql`
  query {
    me {
      username
      email
      github
      linkedin
      description
    }
  }
`;

interface InputState {
  username?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  description?: string;
}

@inject('login')
@observer
export default class ProfilePage extends Component<StoreProps, InputState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = { username: undefined, email: undefined, github: undefined, linkedin: undefined, description: undefined };
  }

  onChangeText = (event: React.ChangeEvent<any>, target: keyof InputState) => {
    this.setState({ [target]: event.target.value } as Pick<InputState, keyof InputState>);
  };

  updateUserProfile = (client: ApolloClient<any>, serverData: InputState) => {
    const { username, email, github, linkedin, description } = this.state;

    if (
      (username && username !== serverData.username) ||
      (email && email !== serverData.email) ||
      (github && github !== serverData.github) ||
      (linkedin && linkedin !== serverData.linkedin) ||
      (description && description !== serverData.description)
    )
      updateUserInfo(client, username, email, github, linkedin, description).then(user => {
        console.log(user);
        if (username && username !== serverData.username) {
          const token = getLoginToken();
          if (token && this.props.login) this.props.login.login(token);
        }
      });
  };

  renderProfile = (username: string, email?: string, github?: string, linkedin?: string, description?: string) => {
    return (
      <div>
        <h3>User Information</h3>
        <InputText label="Username" value={this.state.username || username} onChange={e => this.onChangeText(e, 'username')} />
        <InputText label="Email" value={this.state.email || email} onChange={e => this.onChangeText(e, 'email')} />
        <InputText label="Github ID" value={this.state.github || github} onChange={e => this.onChangeText(e, 'github')} />
        <InputText label="LinkedIn ID" value={this.state.linkedin || linkedin} onChange={e => this.onChangeText(e, 'linkedin')} />

        <TextArea label="Description" value={this.state.description || description} onChange={e => this.onChangeText(e, 'description')} />
      </div>
    );
  };

  renderCategory = (category: string, items: object[]) => {
    return (
      <div>
        <h3>{category}</h3>
        <div>{JSON.stringify(items)}</div>
      </div>
    );
  };

  render() {
    return (
      <Query query={graqhqlQuery}>
        {({ client, loading, error, data }) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          const { me } = data;

          return (
            <div>
              {this.renderProfile(me.username, me.email, me.github, me.linkedin, me.description)}

              <Button color="blue" onClick={() => this.updateUserProfile(client, me)}>
                SAVE
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}

function updateUserInfo(client: ApolloClient<any>, username?: string, email?: string, github?: string, linkedin?: string, description?: string) {
  return (
    client
      .mutate({
        mutation: gql`
          mutation updateUserInfo($username: String, $email: String, $github: String, $linkedin: String, $description: String) {
            updateUserInfo(username: $username, email: $email, github: $github, linkedin: $linkedin, description: $description) {
              username
              email
              github
              linkedin
            }
          }
        `,
        variables: { username, email, github, linkedin, description },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

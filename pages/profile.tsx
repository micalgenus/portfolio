import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';

import { Button } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import { Router, InputText, TextArea } from '@/components';
import { getUserInfo } from '@/lib/graphql/user';

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
  username?: String;
  email?: String;
  github?: String;
  linkedin?: String;
  description?: String;
}

export default class ProfilePage extends Component<{}, InputState> {
  constructor(props: any) {
    super(props);
    this.state = { username: '', email: '', github: '', linkedin: '', description: '' };
  }

  componentDidMount = async () => {
    return getUserInfo()
      .then(({ me }) => this.setState({ username: me.username, email: me.email, github: me.github, linkedin: me.linkedin, description: me.description }))
      .catch(err => console.log(err));
  };

  onChangeText = (event: React.ChangeEvent<any>, target: keyof InputState) => {
    console.log(this.state);
    this.setState({ [target]: event.target.value } as Pick<InputState, keyof InputState>);
  };

  updateUserProfile = (client: ApolloClient<any>, serverData: InputState) => {
    const { username, email, github, linkedin, description } = this.state;
    const compare = {
      username: serverData.username || '',
      email: serverData.email || '',
      github: serverData.github || '',
      linkedin: serverData.linkedin || '',
      description: serverData.description || '',
    };

    if (!isEqual(compare, { username, email, github, linkedin, description })) updateUserInfo(client, username, email, github, linkedin, description);
  };

  renderProfile = (username: string, email?: string, github?: string, linkedin?: string, description?: string) => {
    return (
      <div>
        <h3>User Information</h3>
        <InputText label="Username" value={username} onChange={e => this.onChangeText(e, 'username')} />
        <InputText label="Email" value={email} onChange={e => this.onChangeText(e, 'email')} />
        <InputText label="Github ID" value={github} onChange={e => this.onChangeText(e, 'github')} />
        <InputText label="LinkedIn ID" value={linkedin} onChange={e => this.onChangeText(e, 'linkedin')} />

        <TextArea label="Description" value={description} onChange={e => this.onChangeText(e, 'description')} />
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

function updateUserInfo(client: ApolloClient<any>, username?: String, email?: String, github?: String, linkedin?: String, description?: String) {
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
      variables: {
        username: username || '',
        email: email || '',
        github: github || '',
        linkedin: linkedin || '',
        description: description || '',
      },
    })
    // TODO: Exception error and success alert
    .catch(err => console.log(err));
}

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Query, QueryResult, OperationVariables } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import Sortable from 'sortablejs';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';
import { getOnlyUserInformationQuery, updateUserInfoQuery } from '@/lib/graphql/query';
import { Router, InputText, TextArea } from '@/components';
import { User } from '@/interfaces';

import '@/scss/profile.scss';

interface InputState {
  username?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  description?: string;
}

interface State extends InputState {
  sortable?: Sortable;
  client?: ApolloClient<any>;
}

@inject('login')
@observer
export default class ProfilePage extends Component<StoreProps, State> {
  constructor(props: StoreProps) {
    super(props);
    this.state = { username: undefined, email: undefined, github: undefined, linkedin: undefined, description: undefined };
  }

  onChangeText = (event: React.ChangeEvent<any>, target: keyof InputState, callback: any) => {
    this.setState({ [target]: event.target.value } as Pick<InputState, keyof InputState>);
    callback();
  };

  updateUserInfo = debounce(async (client: ApolloClient<any>, serverData: User) => {
    const { username, email, github, linkedin, description } = this.state;

    // Update only when something change.
    if (
      (username && username !== serverData.username) ||
      (email && email !== serverData.email) ||
      (github && github !== serverData.github) ||
      (linkedin && linkedin !== serverData.linkedin) ||
      (description && description !== serverData.description)
    )
      updateUserInfo(client, { username, email, github, linkedin, description }).then(result => {
        if (result) {
          if (username && username !== serverData.username) {
            const token = getLoginToken();
            if (token && this.props.login) this.props.login.login(token);
          }
        }
      });
  }, 1000);

  renderProfile = (serverData: User, callback: any) => {
    return (
      <div>
        <h3>User Information</h3>
        <InputText label="Username" value={this.state.username || serverData.username} onChange={e => this.onChangeText(e, 'username', callback)} />
        <InputText label="Email" value={this.state.email || serverData.email} onChange={e => this.onChangeText(e, 'email', callback)} />
        <InputText label="Github ID" value={this.state.github || serverData.github} onChange={e => this.onChangeText(e, 'github', callback)} />
        <InputText label="LinkedIn ID" value={this.state.linkedin || serverData.linkedin} onChange={e => this.onChangeText(e, 'linkedin', callback)} />

        <TextArea label="Description" value={this.state.description || serverData.description} onChange={e => this.onChangeText(e, 'description', callback)} />
      </div>
    );
  };

  render() {
    return (
      <Query query={getOnlyUserInformationQuery}>
        {({ client, loading, error, data }: QueryResult<any, OperationVariables>) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          let me: User = data.me;

          return <div className="profile">{this.renderProfile(me, () => this.updateUserInfo(client, me))}</div>;
        }}
      </Query>
    );
  }
}

function updateUserInfo(client: ApolloClient<any>, { username, email, github, linkedin, description }: User) {
  return client
    .mutate({
      mutation: updateUserInfoQuery,
      variables: { username, email, github, linkedin, description },
      update: (proxy, { data: { updateUserInfo } }) => {
        const { me } = proxy.readQuery<{ me: {} }, any>({ query: getOnlyUserInformationQuery }) || { me: {} };
        proxy.writeQuery({ query: getOnlyUserInformationQuery, data: { me: { ...me, ...updateUserInfo } } });
      },
    })
    .then(() => toast.success('Completed update user information.'))
    .catch(err => {
      toast.error(err.message);
      Promise.resolve(false);
    });
}

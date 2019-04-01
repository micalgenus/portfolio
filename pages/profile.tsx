import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Query, QueryResult, OperationVariables } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { Button } from 'semantic-ui-react';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';
import { getUserQuery, updateUserInfoQuery, addCategoryQuery } from '@/lib/graphql/query';
import { Router, InputText, TextArea, CategoryManage } from '@/components';
import { User } from '@/interfaces';

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

  updateUserInfo = async (client: ApolloClient<any>, serverData: User) => {
    const { username, email, github, linkedin, description } = this.state;

    // Update only when something change.
    if (
      (username && username !== serverData.username) ||
      (email && email !== serverData.email) ||
      (github && github !== serverData.github) ||
      (linkedin && linkedin !== serverData.linkedin) ||
      (description && description !== serverData.description)
    )
      updateUserInfo(client, { username, email, github, linkedin, description }).then(() => {
        if (username && username !== serverData.username) {
          const token = getLoginToken();
          if (token && this.props.login) this.props.login.login(token);
        }
      });
  };

  renderProfile = (username?: string, email?: string, github?: string, linkedin?: string, description?: string) => {
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

  renderCategory = (id?: string, category?: string, items?: object[]) => {
    return (
      <div key={id}>
        <h3 />
        <InputText label="Category" value={category} />

        <div>{JSON.stringify(items)}</div>
      </div>
    );
  };

  render() {
    return (
      <Query query={getUserQuery}>
        {({ client, loading, error, data }: QueryResult<any, OperationVariables>) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          let me: User = data.me;
          let categories = me.categories || [];

          return (
            <>
              <div>
                {this.renderProfile(me.username, me.email, me.github, me.linkedin, me.description)}
                <Button color="blue" onClick={() => this.updateUserInfo(client, me)}>
                  SAVE
                </Button>
              </div>

              {categories.map(v => (
                <CategoryManage key={v._id} _id={v._id} category={v.name || ''} items={[]} client={client} />
              ))}

              <div>
                <Button color="teal" onClick={() => addCategory(client)}>
                  Add Category
                </Button>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

function updateUserInfo(client: ApolloClient<any>, { username, email, github, linkedin, description }: User) {
  return (
    client
      .mutate({
        mutation: updateUserInfoQuery,
        variables: { username, email, github, linkedin, description },
        update: (proxy, { data: { updateUserInfo } }) => {
          const { me } = proxy.readQuery<{ me: {} }, any>({ query: getUserQuery }) || { me: {} };
          proxy.writeQuery({ query: getUserQuery, data: { me: { ...me, ...updateUserInfo } } });
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

function addCategory(client: ApolloClient<any>) {
  return (
    client
      .mutate({
        mutation: addCategoryQuery,
        update: (proxy, { data: { createCategory } }) => {
          if (createCategory) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery });
            proxy.writeQuery({
              query: getUserQuery,
              data: { me: { ...me, categories: [...me.categories, { _id: createCategory, name: null, __typename: 'Category' }] } },
            });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

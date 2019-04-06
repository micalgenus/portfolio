import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Query, QueryResult, OperationVariables } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { Button } from 'semantic-ui-react';
import Sortable, { SortableEvent } from 'sortablejs';
import { debounce } from 'lodash';

import { StoreProps } from '@/lib/store';
import { getLoginToken } from '@/lib/utils/cookie';
import { getUserQuery, updateUserInfoQuery, addCategoryQuery, updateCategorySequenceQuery } from '@/lib/graphql/query';
import { Router, InputText, TextArea, CategoryManage } from '@/components';
import { User } from '@/interfaces';

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

  getSortableElement = () => document.getElementById('main');

  getCategoryComponents = (e: SortableEvent) => {
    const { newIndex, oldIndex } = e;
    const startFilter = Math.min(newIndex || 0, oldIndex || 0);
    const endFilter = Math.max(newIndex || 0, oldIndex || 0);

    const el = this.getSortableElement();
    if (el) {
      const children: Element[] = Array.prototype.filter.call(el.children, (v: Element) => v.className === 'category-manage-component');
      return children
        .map((v, i) => ({ _id: v.getAttribute('data-id') || '', sequence: children.length - i }))
        .filter((_, i) => startFilter <= i + 1 && i + 1 <= endFilter);
    }

    return [];
  };

  createSortable = (client: ApolloClient<any>) => {
    const el = this.getSortableElement();
    if (el) {
      new Sortable(el, {
        handle: '.category-handle',
        filter: '.profile,.add-category-button',
        draggable: '.category-manage-component',
        animation: 150,
        onSort: debounce(e => updateCategoriesSequence(client, this.getCategoryComponents(e)), 500),
      });
    }
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

  render() {
    return (
      <Query query={getUserQuery}>
        {({ client, loading, error, data }: QueryResult<any, OperationVariables>) => {
          if (error) return <div>{Router.push('/') && null}</div>;
          if (loading) return <div>Loading</div>;

          let me: User = data.me;
          let categories = me.categories || [];

          this.createSortable(client);

          return (
            <>
              <div className="profile">
                {this.renderProfile(me.username, me.email, me.github, me.linkedin, me.description)}
                <Button color="blue" onClick={() => this.updateUserInfo(client, me)}>
                  SAVE
                </Button>
              </div>

              {categories.map(v => (v._id ? <CategoryManage key={v._id} _id={v._id} category={v.name || ''} items={v.items || []} client={client} /> : null))}

              <div className="add-category-button">
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

function updateCategoriesSequence(client: ApolloClient<any>, sequences: { _id: string; sequence: number }[]) {
  return (
    client
      .mutate({
        mutation: updateCategorySequenceQuery,
        variables: { sequences },
        update: (proxy, { data: { updateCategorySequence } }) => {
          if (updateCategorySequence) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery });
            for (let i = 0; i < me.categories.length; i++) {
              const category = me.categories[i];
              const [find] = sequences.filter(v => v._id === category._id);
              const { sequence } = find || { sequence: me.categories.length - i };
              category.sequence = sequence;
            }
            me.categories.sort((a: any, b: any) => b.sequence - a.sequence);

            proxy.writeQuery({
              query: getUserQuery,
              data: { me: { ...me, categories: me.categories.map(({ sequence, ...v }: any) => ({ ...v })) } },
            });
          }
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
              data: { me: { ...me, categories: [...me.categories, { _id: createCategory, name: null, items: [], __typename: 'Category' }] } },
            });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Query, QueryResult, OperationVariables } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { Icon } from 'semantic-ui-react';
import Sortable, { SortableEvent } from 'sortablejs';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

import { StoreProps } from '@/lib/store';
import { getUserQuery, addCategoryQuery, updateCategorySequenceQuery } from '@/lib/graphql/query';
import { Router, InputText, CategoryManage } from '@/components';
import { User } from '@/interfaces';

import '@/scss/profile.css';

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
        filter: '.profile,.add-category-container',
        draggable: '.category-manage-component',
        animation: 150,
        onSort: e => updateCategoriesSequence(client, this.getCategoryComponents(e)),
      });
    }
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
              {categories.map(v => (v._id ? <CategoryManage key={v._id} _id={v._id} category={v.name || ''} items={v.items || []} client={client} /> : null))}

              <div className="add-category-container">
                <div className="add-category-button" onClick={() => addCategory(client)}>
                  <Icon name="plus" color="green" />
                </div>
                <InputText label="Category" disabled={true} />
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

const updateCategoriesSequence = debounce(async (client: ApolloClient<any>, sequences: { _id: string; sequence: number }[]) => {
  return client
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
    .then(() => toast.success('Completed update user information.'))
    .catch(err => toast.error(err.message));
}, 500);

function addCategory(client: ApolloClient<any>) {
  return client
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
    .then(() => toast.success('Completed add category of profile in user.'))
    .catch(err => toast.error(err.message));
}

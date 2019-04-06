import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { ApolloClient } from 'apollo-client';


import { InputText, CategoryItemManage } from '@/components';
import { getUserQuery, removeCategoryQuery, updateCategoryQuery, createCategoryItemQuery } from '@/lib/graphql/query';
import { Category } from '@/interfaces';

import './Category.scss';

interface Props {
  _id: string;
  client: ApolloClient<any>;
  category: string;
  items: any[];
}

interface State {
  name: string;
}

export default class CategoryComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { name: props.category };
  }

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const { items, client, _id } = this.props;
    const { name } = this.state;

    return (
      <div className="category-manage-component" id={`category-${_id}`} data-id={_id}>
        <InputText label="Category" value={name} onChange={e => this.onChangeText(e, 'name')} />

        {items.map((v: Category) =>
          v._id ? (
            <CategoryItemManage key={v._id} client={client} _id={v._id} category={_id} name={v.name || ''}>
              <div />
            </CategoryItemManage>
          ) : null
        )}

        <div className="button-group">
          <Button color="red" animated="vertical" onClick={() => removeCategory(client, { _id })}>
            <Button.Content hidden>Remove</Button.Content>
            <Button.Content visible>
              <Icon name="trash" size="small" />
            </Button.Content>
          </Button>
          <Button color="teal" onClick={() => addCategoryItem(client, _id)}>
            Add Items
          </Button>
          <Button color="blue" onClick={() => updateCategory(client, { _id, name: name })}>
            Save Category
          </Button>
        </div>
      </div>
    );
  }
}

function removeCategory(client: ApolloClient<any>, { _id }: Category) {
  return (
    client
      .mutate({
        mutation: removeCategoryQuery,
        variables: { id: _id },
        update: (proxy, { data: { removeCategory } }) => {
          if (removeCategory) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery }) || { me: {} };
            proxy.writeQuery({
              query: getUserQuery,
              data: { me: { ...me, categories: me.categories.filter((v: Category) => v._id !== _id) } },
            });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

function addCategoryItem(client: ApolloClient<any>, category: string) {
  return (
    client
      .mutate({
        mutation: createCategoryItemQuery,
        variables: { category },
        update: (proxy, { data: { createCategoryItem } }) => {
          if (createCategoryItem) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery }) || { me: {} };
            const categories: Category[] = me.categories;
            const [targetCategory] = categories.filter((c: Category) => c._id === category);
            if (targetCategory && targetCategory.items)
              targetCategory.items = [...targetCategory.items, { _id: createCategoryItem, name: '', description: '', __typename: 'Categoryitem' }];

            proxy.writeQuery({ query: getUserQuery, data: { me } });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

function updateCategory(client: ApolloClient<any>, { _id, name }: Category) {
  return (
    client
      .mutate({
        mutation: updateCategoryQuery,
        variables: { id: _id, category: { name } },
        update: (proxy, { data: { updateCategory } }) => {
          if (updateCategory) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery }) || { me: {} };
            proxy.writeQuery({ query: getUserQuery, data: { me } });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

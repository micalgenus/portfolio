import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';

import { Button } from 'semantic-ui-react';

import { removeCategoryItemQuery, getUserQuery } from '@/lib/graphql/query';

import './CategoryItem.scss';
import { Category, CategoryItem } from '@/interfaces';

interface Props {
  client: ApolloClient<any>;
  _id: string;
  name: string;
  category: string;
}

export default class CategoryItemComponent extends Component<Props> {
  render() {
    const { _id, client, category, name } = this.props;

    return (
      <div className="category-item-manage-component" data-id={_id}>
        <h3>{name}</h3>

        <Button color="red" onClick={() => removeCategoryItem(client, _id, category)}>
          Remove
        </Button>
      </div>
    );
  }
}

function removeCategoryItem(client: ApolloClient<any>, id: string, category: string) {
  return (
    client
      .mutate({
        mutation: removeCategoryItemQuery,
        variables: { id, category },
        update: (proxy, { data: { removeCategoryItem } }) => {
          if (removeCategoryItem) {
            const { me } = proxy.readQuery<any, any>({ query: getUserQuery }) || { me: {} };
            const categories: Category[] = me.categories;
            const [targetCategory] = categories.filter((c: Category) => c._id === category);
            if (targetCategory && targetCategory.items) targetCategory.items = targetCategory.items.filter((i: CategoryItem) => i._id !== id);
            proxy.writeQuery({ query: getUserQuery, data: { me } });
          }
        },
      })
      // TODO: Exception error and success alert
      .catch(err => console.log(err))
  );
}

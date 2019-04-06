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
      </div>
    );
  }
}

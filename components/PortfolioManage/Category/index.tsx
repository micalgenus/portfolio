import React, { Component } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { ApolloClient } from 'apollo-client';

import { InputText } from '@/components';
import { getUserQuery, removeCategoryQuery } from '@/lib/graphql/query';
import { Category } from '@/interfaces';

import './Category.scss';

interface Props {
  items: any[];
  category: string;
  _id?: string;
  client?: ApolloClient<any>;
}

export default class CategoryComponent extends Component<Props> {
  render() {
    const { category, items, client, _id } = this.props;
    if (!_id || !client) return <div />;

    return (
      <div className="category-manage-component">
        <Grid className="category-title">
          <Grid.Column width={15}>
            <InputText label="Category" value={category} />
          </Grid.Column>
          <Grid.Column width={1}>
            <Button color="red" animated="vertical" onClick={() => removeCategory(client, { _id })}>
              <Button.Content hidden>Remove</Button.Content>
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>

        <div>{JSON.stringify(items)}</div>
        <div>
          <Button color="teal">Add Items</Button>
          <Button color="blue">Save</Button>
        </div>
      </div>
    );
  }
}

function removeCategory(client: ApolloClient<any>, { _id }: Category) {
}

import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';

import { Icon } from 'semantic-ui-react';
import { debounce } from 'lodash';

import { InputText, TextArea } from '@/components';

import './CategoryItem.scss';
import { updateCategoryItem, removeCategoryItem } from './graphql';

interface Props {
  client: ApolloClient<any>;
  _id: string;
  name: string;
  category: string;
  description: string;
}

interface State {
  name: string;
  description: string;
}

export default class CategoryItemComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { name: props.name, description: props.description };
  }

  onChangeText = (event: React.ChangeEvent<any>, target: keyof State, callback: any) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
    callback();
  };

  updateItem = debounce(async () => {
    const { client, _id, category } = this.props;
    const { name, description } = this.state;
    updateCategoryItem(client, category, { _id, name, description });
  }, 1000);

  render() {
    const { _id, client, category, name, description } = this.props;

    return (
      <div className="category-item-manage-component" data-id={_id}>
        <div className="remove-item-button" onClick={() => (confirm('Are you sure you want to delete?') ? removeCategoryItem(client, _id, category) : null)}>
          <Icon name="trash" size="small" color="red" />
        </div>

        <div className="category-item-handle">
          <Icon name="arrows alternate" />
        </div>

        <div className="category-item-manage-container">
          <InputText label="Name" value={name} onChange={e => this.onChangeText(e, 'name', this.updateItem)} />
          <TextArea label="Description" value={description} onChange={e => this.onChangeText(e, 'description', this.updateItem)} />
        </div>
      </div>
    );
  }
}

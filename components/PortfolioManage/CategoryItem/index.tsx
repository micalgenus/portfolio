import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';

import { Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

import { InputText } from '@/components';
import { removeCategoryItemQuery, getUserQuery, updateCategoryItemQuery } from '@/lib/graphql/query';

import './CategoryItem.scss';
import { Category, CategoryItem } from '@/interfaces';

interface Props {
  client: ApolloClient<any>;
  _id: string;
  name: string;
  category: string;
}

interface State {
  name: string;
}

export default class CategoryItemComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { name: props.name };
  }

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State, callback: any) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
    callback();
  };

  updateItem = debounce(async () => {
    const { client, _id, category } = this.props;
    const { name } = this.state;
    updateCategoryItem(client, category, { _id, name });
  }, 1000);

  render() {
    const { _id, client, category, name } = this.props;

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
        </div>
      </div>
    );
  }
}

function removeCategoryItem(client: ApolloClient<any>, id: string, category: string) {
  return client
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
    .then(() => toast.success('Completed remove item in user category.'))
    .catch(err => toast.error(err.message));
}

function updateCategoryItem(client: ApolloClient<any>, category: string, { _id, name }: CategoryItem) {
  return client
    .mutate({
      mutation: updateCategoryItemQuery,
      variables: { id: _id, category, item: { name } },
    })
    .then(() => toast.success('Completed update category information of user.'))
    .catch(err => toast.error(err.message));
}

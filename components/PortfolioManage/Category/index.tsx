import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { ApolloClient } from 'apollo-client';

import Sortable, { SortableEvent } from 'sortablejs';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import { InputText, CategoryItemManage } from '@/components';
import { getUserQuery, removeCategoryQuery, updateCategoryQuery, createCategoryItemQuery, updateCategoryItemSequenceQuery } from '@/lib/graphql/query';
import { Category, CategoryItem } from '@/interfaces';

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

  componentDidMount = () => {
    this.createSortable();
  };

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>, target: keyof State, callback: any) => {
    this.setState({ [target]: event.target.value } as Pick<State, keyof State>);
    callback();
  };

  updateCategory = debounce(async () => {
    const { client, _id } = this.props;
    const { name } = this.state;
    updateCategory(client, { _id, name });
  }, 1000);

  getSortableElement = () => {
    const { _id } = this.props;
    return document.getElementById(`category-${_id}`);
  };

  getCategoryComponents = (e: SortableEvent) => {
    const { newIndex, oldIndex } = e;
    const startFilter = Math.min(newIndex || 0, oldIndex || 0) - 3;
    const endFilter = Math.max(newIndex || 0, oldIndex || 0) - 3;

    const el = this.getSortableElement();
    if (el) {
      const children: Element[] = Array.prototype.filter.call(el.children, (v: Element) => v.className === 'category-item-manage-component');
      return children
        .map((v, i) => ({ _id: v.getAttribute('data-id') || '', sequence: children.length - i }))
        .filter((_, i) => startFilter <= i && i <= endFilter);
    }

    return [];
  };

  createSortable = () => {
    const { client, _id } = this.props;
    const el = this.getSortableElement();
    if (el) {
      new Sortable(el, {
        handle: '.category-item-handle',
        draggable: '.category-item-manage-component',
        animation: 150,
        onSort: e => updateCategoryItemSequence(client, _id, this.getCategoryComponents(e)),
      });
    }
  };

  render() {
    const { items, client, _id } = this.props;
    const { name } = this.state;

    return (
      <div className="category-manage-component" id={`category-${_id}`} data-id={_id}>
        <div className="category-handle">
          <Icon name="arrows alternate" />
        </div>
        <div className="remove-category-button" onClick={() => (confirm('Are you sure you want to delete?') ? removeCategory(client, { _id }) : null)}>
          <Icon name="trash" size="small" color="red" />
        </div>
        <InputText label="Category" value={name} onChange={e => this.onChangeText(e, 'name', this.updateCategory)} />

        {items.map((v: CategoryItem) =>
          v._id ? (
            <CategoryItemManage key={v._id} client={client} _id={v._id} category={_id} name={v.name || ''} description={v.description || ''}>
              <div />
            </CategoryItemManage>
          ) : null
        )}

        <div className="add-item-container">
          <div className="add-item-button" onClick={() => addCategoryItem(client, _id)}>
            <Icon name="plus" size="small" color="green" />
          </div>
          <div>Add Item</div>
        </div>
      </div>
    );
  }
}

function removeCategory(client: ApolloClient<any>, { _id }: Category) {
  return client
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
    .then(() => toast.success('Completed remove category in user information.'))
    .catch(err => toast.error(err.message));
}

function addCategoryItem(client: ApolloClient<any>, category: string) {
  return client
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
    .then(() => toast.success('Completed add item in user category.'))
    .catch(err => toast.error(err.message));
}

function updateCategory(client: ApolloClient<any>, { _id, name }: Category) {
  return client
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
    .then(() => toast.success('Completed update category information of user.'))
    .catch(err => toast.error(err.message));
}

const updateCategoryItemSequence = debounce(async (client: ApolloClient<any>, category: string, sequences: { _id: string; sequence: number }[]) => {
  return client
    .mutate({
      mutation: updateCategoryItemSequenceQuery,
      variables: { category, sequences },
      update: (proxy, { data: { updateCategoryItemSequence } }) => {
        if (updateCategoryItemSequence) {
          const { me } = proxy.readQuery<any, any>({ query: getUserQuery });
          const [targetCategory] = me.categories.filter((c: Category) => c._id === category);
          if (targetCategory) {
            for (let i = 0; i < targetCategory.items.length; i++) {
              const item = targetCategory.items[i];
              const [find] = sequences.filter(v => v._id === item._id);
              const { sequence } = find || { sequence: targetCategory.items.length - i };
              item.sequence = sequence;
            }

            targetCategory.items.sort((a: any, b: any) => b.sequence - a.sequence);
            targetCategory.items = targetCategory.items.map(({ sequence, ...v }: any) => ({ ...v }));

            proxy.writeQuery({ query: getUserQuery, data: { me } });
          }
        }
      },
    })
    .then(() => toast.success('Completed update category information of user.'))
    .catch(err => toast.error(err.message));
}, 500);

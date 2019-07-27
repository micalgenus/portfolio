import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { ApolloClient } from 'apollo-client';

import Sortable, { SortableEvent } from 'sortablejs';
import { debounce } from 'lodash';

import { InputText, CategoryItemManage } from '@/components';
import { CategoryItem } from '@/interfaces';

import { updateCategory, updateCategoryItemSequence, addCategoryItem, removeCategory } from './graphql';

import './Category.css';

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

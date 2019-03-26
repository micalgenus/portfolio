import React, { Component } from 'react';

import { CategoryTemplate, ItemTemplate } from '@/components';
import { LinkItem } from '@/interfaces';

import data from '@/data.json';

interface DataItem {
  title: string;
  links: LinkItem[];
  date?: string;
  description?: string;
}

export default class IndexPage extends Component {
  render() {
    return data.map((v: any, i: number) => (
      <CategoryTemplate key={i} category={v.category} description={v.description} links={v.links}>
        {v.items && v.items.map((item: DataItem, index: number) => <ItemTemplate key={index} {...item} />)}
      </CategoryTemplate>
    ));
  }
}

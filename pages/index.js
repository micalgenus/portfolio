import React, { Component } from 'react';

import { CategoryTemplate, ItemTemplate } from '@/components';

import data from '@/data';

export default class IndexPage extends Component {
  render() {
    return data.map((v, i) => (
      <CategoryTemplate key={i} category={v.category} description={v.description} links={v.links}>
        {v.items && v.items.map((item, index) => <ItemTemplate key={index} {...item} />)}
      </CategoryTemplate>
    ));
  }
}

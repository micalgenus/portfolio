import React from 'react';
import PageTemplate from '@/Pages';

import CategoryTemplate from '@/Components/CategoryTemplate';
import ItemTemplate from '@/Components/ItemTemplate';

import data from '@/data';

export default class Main extends PageTemplate {
  render() {
    return data.map((v, i) => (
      <CategoryTemplate key={i} category={v.category} description={v.description} links={v.links}>
        {v.items && v.items.map((item, index) => <ItemTemplate key={index} {...item} />)}
      </CategoryTemplate>
    ));
  }
}

import { toast } from 'react-toastify';
import { ApolloClient } from 'apollo-client';
import { debounce } from 'lodash';

import { getUserQuery, removeCategoryQuery, updateCategoryQuery, createCategoryItemQuery, updateCategoryItemSequenceQuery } from '@/lib/graphql/query';
import { Category } from '@/interfaces';

export const removeCategory = (client: ApolloClient<any>, { _id }: Category) => {
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
};

export const addCategoryItem = (client: ApolloClient<any>, category: string) => {
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
};

export const updateCategory = (client: ApolloClient<any>, { _id, name }: Category) => {
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
};

export const updateCategoryItemSequence = debounce(async (client: ApolloClient<any>, category: string, sequences: { _id: string; sequence: number }[]) => {
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

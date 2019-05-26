import { ApolloClient } from 'apollo-client';
import { toast } from 'react-toastify';

import { removeCategoryItemQuery, getUserQuery, updateCategoryItemQuery } from '@/lib/graphql/query';
import { Category, CategoryItem } from '@/interfaces';

export const removeCategoryItem = (client: ApolloClient<any>, id: string, category: string) => {
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
};

export const updateCategoryItem = (client: ApolloClient<any>, category: string, { _id, name, description }: CategoryItem) => {
  return client
    .mutate({
      mutation: updateCategoryItemQuery,
      variables: { id: _id, category, item: { name, description } },
    })
    .then(() => toast.success('Completed update category information of user.'))
    .catch(err => toast.error(err.message));
};

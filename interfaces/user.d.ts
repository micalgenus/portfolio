interface GraphQLResult {
  __typename?: string;
}

export interface User extends GraphQLResult {
  _id?: string;
  id?: string;
  email?: string;
  username?: string;
  github?: string;
  linkedin?: string;
  description?: string;
  categories?: Category[];
}

export interface Category extends GraphQLResult {
  _id?: string;
  user?: string;
  name?: string;
  items?: CategoryItem[];
}

export interface CategoryItem extends GraphQLResult {
  _id?: string;
  name?: string;
  description?: string;
}

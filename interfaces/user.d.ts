export interface User {
  _id?: string;
  id?: string;
  email?: string;
  username?: string;
  github?: string;
  linkedin?: string;
  description?: string;
  categories?: Category[];
}

export interface Category {
  _id?: string;
  user?: string;
  name?: string;
  items?: any;
}

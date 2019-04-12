import gql from 'graphql-tag';

/**
 * User information queries
 */
export const getUserQuery = gql`
  query {
    me {
      id
      username
      email
      github
      linkedin
      description
      categories {
        _id
        name
        items {
          _id
          name
          description
        }
      }
    }
  }
`;

export const getUserInfoQuery = gql`
  query getUserInfo($id: String!) {
    getUserInfo(id: $id) {
      username
      email
      github
      linkedin
      description
      categories {
        _id
        name
        items {
          _id
          name
          description
        }
      }
    }
  }
`;

export const updateUserInfoQuery = gql`
  mutation updateUserInfo($username: String, $email: String, $github: String, $linkedin: String, $description: String) {
    updateUserInfo(username: $username, email: $email, github: $github, linkedin: $linkedin, description: $description) {
      username
      email
      github
      linkedin
      description
    }
  }
`;

/**
 * Category queries
 */
export const addCategoryQuery = gql`
  mutation {
    createCategory
  }
`;

export const updateCategoryQuery = gql`
  mutation updateCategory($id: String!, $category: CategoryInput!) {
    updateCategory(id: $id, category: $category) {
      _id
      name
    }
  }
`;

export const updateCategorySequenceQuery = gql`
  mutation updateCategorySequence($sequences: [SequenceInput]!) {
    updateCategorySequence(sequences: $sequences)
  }
`;

export const removeCategoryQuery = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id: $id)
  }
`;

/**
 * Category item queries
 */
export const createCategoryItemQuery = gql`
  mutation createCategoryItem($category: String!) {
    createCategoryItem(category: $category)
  }
`;

export const updateCategoryItemQuery = gql`
  mutation updateCategoryItem($id: String!, $category: String!, $item: CategoryItemInput!) {
    updateCategoryItem(id: $id, category: $category, item: $item) {
      _id
      name
      description
    }
  }
`;

export const updateCategoryItemSequenceQuery = gql`
  mutation updateCategoryItemSequence($category: String!, $sequences: [SequenceInput]!) {
    updateCategoryItemSequence(category: $category, sequences: $sequences)
  }
`;

export const removeCategoryItemQuery = gql`
  mutation removeCategoryItem($id: String!, $category: String!) {
    removeCategoryItem(id: $id, category: $category)
  }
`;

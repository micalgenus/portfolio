import gql from 'graphql-tag';

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

export const createCategoryItemQuery = gql`
  mutation createCategoryItem($category: String!) {
    createCategoryItem(category: $category)
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

export const addCategoryQuery = gql`
  mutation {
    createCategory
  }
`;

export const removeCategoryQuery = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id: $id)
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

export const removeCategoryItemQuery = gql`
  mutation removeCategoryItem($id: String!, $category: String!) {
    removeCategoryItem(id: $id, category: $category)
  }
`;

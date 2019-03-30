import { requestGraphqlWithAxios, gql } from './index';

export const signup = async (id: string, username: string, email: string, password: string) => {
  return requestGraphqlWithAxios(
    gql`
      mutation signup($id: String!, $username: String!, $email: String!, $password: String!) {
        signup(id: $id, username: $username, email: $email, password: $password)
      }
    `,
    { id, username, email, password }
  );
};

export const login = async (id: string, password: string) => {
  id = id.replace(/"/g, '\\"');
  password = password.replace(/"/g, '\\"');
  return requestGraphqlWithAxios(
    gql`
      mutation login($id: String!, $password: String!) {
        login(id: $id, password: $password)
      }
    `,
    { id, password }
  );
};

export const getUserInfo = async () => {
  return requestGraphqlWithAxios(
    gql`
      query {
        me {
          id
          username
          email
        }
      }
    `
  );
};

import { requestGraphqlWithAxiosRetry, gql } from './index';

export const signup = async (id: string, username: string, email: string, password: string) => {
  return requestGraphqlWithAxiosRetry(
    gql`
      mutation signup($id: String!, $username: String!, $email: String!, $password: String!) {
        signup(id: $id, username: $username, email: $email, password: $password)
      }
    `,
    { id, username, email, password }
  );
};

export const login = async (id: string, password: string, remember: boolean) => {
  id = id.replace(/"/g, '\\"');
  password = password.replace(/"/g, '\\"');
  return requestGraphqlWithAxiosRetry(
    gql`
      mutation login($id: String!, $password: String!, $remember: Boolean!) {
        login(id: $id, password: $password)
        rememberMe(id: $id, password: $password) @include(if: $remember)
      }
    `,
    { id, password, remember }
  );
};

export const rememberLogin = async (token: string): Promise<string | null> => {
  return requestGraphqlWithAxiosRetry(
    gql`
      mutation rememberMeLogin($token: String!) {
        rememberMeLogin(token: $token)
      }
    `,
    { token }
  ).then(res => res.rememberMeLogin);
};

export const getUserInfo = async () => {
  return requestGraphqlWithAxiosRetry(
    gql`
      query {
        me {
          id
          username
          email
          github
          linkedin
          description
        }
      }
    `
  );
};

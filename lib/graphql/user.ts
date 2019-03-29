import { requestGraphqlWithAxios } from './index';

export const signup = async (id: string, username: string, email: string, password: string) => {
  id = id.replace(/"/g, '\\"');
  username = username.replace(/"/g, '\\"');
  email = email.replace(/"/g, '\\"');
  password = password.replace(/"/g, '\\"');
  return requestGraphqlWithAxios(
    `mutation {
      signup(id:"${id}", username:"${username}", email:"${email}", password:"${password}")
    }`
  );
};

export const login = async (id: string, password: string) => {
  id = id.replace(/"/g, '\\"');
  password = password.replace(/"/g, '\\"');
  return requestGraphqlWithAxios(
    `mutation {
      login(id:"${id}", password:"${password}")
    }`
  );
};

export const getUserInfo = async () => {
  return requestGraphqlWithAxios(
    `query {
      me {
        id
        username
        email
      }
    }`
  );
};

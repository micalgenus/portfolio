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

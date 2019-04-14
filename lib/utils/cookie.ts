const setCookie = (name: string, value: any, exp: number = 1) => {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + date.toUTCString() + ';path=/';
};

const getCookie = (name: string) => {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? JSON.parse(value[2]) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const AUTH_COOKIE = 'authentication';

export const setLoginToken = (value: string) => {
  setCookie(AUTH_COOKIE, value, 1);
};

// ToDo: refresh token #12
// export const refreshLoginToken = () => {
// }

export const getLoginToken = (): string => {
  return getCookie(AUTH_COOKIE);
};

export const removeLoginToken = () => {
  deleteCookie(AUTH_COOKIE);
};

const REMEMBER_TOKEN = 'rememberAuthentication';

export const setRememberLoginToken = (value: string) => {
  setCookie(REMEMBER_TOKEN, value, 36500);
};

export const getRememberLoginToken = (): string => {
  return getCookie(REMEMBER_TOKEN);
};

export const removeRememberLoginToken = () => {
  deleteCookie(REMEMBER_TOKEN);
};

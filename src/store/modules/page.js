// Action
const CHANGE_PATH = 'page/CHANGE_PATH';
const SHOW_LOADING = 'page/SHOW_LOADING';
const HIDE_LOADING = 'page/HIDE_LOADING';

// Action Creator
export const changePath = path => ({ type: CHANGE_PATH, path });
export const showLoading = (timeout = 5000) => ({ type: SHOW_LOADING, timeout }); // timeout => ms
export const hideLoading = () => ({ type: HIDE_LOADING });

// Initial status
const initialState = { path: '/', timeout: 5000, loading: false };

// Reducer
export default function page(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PATH:
      return {
        ...state,
        path: action.path,
      };
    case SHOW_LOADING:
      return {
        ...state,
        timeout: action.timeout,
        loading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

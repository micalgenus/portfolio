import { createAction, handleActions } from 'redux-actions';

// Action
const CHANGE_PATH = 'page/CHANGE_PATH';
const SHOW_LOADING = 'page/SHOW_LOADING';
const HIDE_LOADING = 'page/HIDE_LOADING';

// Action Creator
export const changePath = createAction(CHANGE_PATH, path => path);
export const showLoading = createAction(SHOW_LOADING, timeout => (timeout === 0 || timeout ? timeout : 5000));
export const hideLoading = createAction(HIDE_LOADING);

// Initial status
const initialState = { path: '/', timeout: 5000, loading: false };

// Reducer
export default handleActions(
  {
    [CHANGE_PATH]: (state, action) => ({
      ...state,
      path: action.payload,
    }),
    [SHOW_LOADING]: (state, action) => ({
      ...state,
      timeout: action.payload,
      loading: true,
    }),
    [HIDE_LOADING]: (state, action) => ({
      ...state,
      loading: false,
    }),
  },
  initialState
);

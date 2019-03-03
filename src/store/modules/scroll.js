import { createAction, handleActions } from 'redux-actions';

// Action
const CHANGE_SCROLL_Y = 'scroll/CHANGE_SCROLL_Y';
const CHANGE_WINDOW_HEIGHT = 'scroll/CHANGE_WINDOW_HEIGHT';

// Action Creator
export const changeScrollY = createAction(CHANGE_SCROLL_Y, scrollY => scrollY);
export const changeWindowHeight = createAction(CHANGE_WINDOW_HEIGHT, height => height);

// Initial status
const initialState = { scrollY: 0, height: 0 };

// Reducer
export default handleActions(
  {
    [CHANGE_SCROLL_Y]: (state, action) => ({
      ...state,
      scrollY: action.payload,
    }),
    [CHANGE_WINDOW_HEIGHT]: (state, action) => ({
      ...state,
      height: action.payload,
    }),
  },
  initialState
);

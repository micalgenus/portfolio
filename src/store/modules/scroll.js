// Action
const CHANGE_SCROLL_Y = 'scroll/CHANGE_SCROLL_Y';
const CHANGE_WINDOW_HEIGHT = 'scroll/CHANGE_WINDOW_HEIGHT';

// Action Creator
export const changeScrollY = scrollY => ({ type: CHANGE_SCROLL_Y, scrollY });
export const changeWindowHeight = height => ({ type: CHANGE_WINDOW_HEIGHT, height });

// Initial status
const initialState = { scrollY: 0, height: 0 };

// Reducer
export default function scroll(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCROLL_Y:
      return {
        ...state,
        scrollY: action.scrollY,
      };
    case CHANGE_WINDOW_HEIGHT:
      return {
        ...state,
        height: action.height,
      };
    default:
      return state;
  }
}

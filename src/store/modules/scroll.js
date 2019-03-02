// Action
const CHANGE_SCROLL_Y = 'scroll/CHANGE_SCROLL_Y';

// Action Creator
export const changeScrollY = scrollY => ({ type: CHANGE_SCROLL_Y, scrollY });

// Initial status
const initialState = { scrollY: 0 };

// Reducer
export default function scroll(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCROLL_Y:
      return {
        ...state,
        scrollY: action.scrollY,
      };
    default:
      return state;
  }
}

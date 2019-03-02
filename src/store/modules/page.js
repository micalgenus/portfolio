// Action
const CHANGE_PATH = 'page/CHANGE_PATH';

// Action Creator
export const changePath = path => ({ type: CHANGE_PATH, path });

// Initial status
const initialState = { path: '/' };

// Reducer
export default function page(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PATH:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
}

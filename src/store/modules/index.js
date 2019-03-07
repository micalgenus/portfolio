import { combineReducers } from 'redux';
import scroll from './scroll';
import page from './page';

export const mapStateToProps = state => ({
  path: state.page.path,
  timeout: state.page.timeout,
  loading: state.page.loading,
  scrollY: state.scroll.scrollY,
  height: state.scroll.height,
});

export default combineReducers({ scroll, page });

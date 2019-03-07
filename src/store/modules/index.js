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

export const defaultProps = {
  path: '/',
  timeout: 0,
  loading: false,
  scrollY: 0,
  height: 0,
};

export const propTypes = {
  path: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  scrollY: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default combineReducers({ scroll, page });

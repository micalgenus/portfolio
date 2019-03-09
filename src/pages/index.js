import { Component } from 'react';

export default class PageTemplate extends Component {
  componentDidMount = () => {
    if (this.props.endLoadPage && typeof this.props.endLoadPage === 'function') this.props.endLoadPage(this.props.link);
  };
}

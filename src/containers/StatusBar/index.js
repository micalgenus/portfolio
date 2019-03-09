import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import ScrollPosition from '@/Components/ScrollPosition';
import LoadingStatus from '@/Components/LoadingStatus';

import './StatusBar.scss';

/**
 * @description Loading and Page scroll status bar
 */
@inject('page')
@inject('scroll')
@observer
class StatusBarContainer extends Component {
  render() {
    const { page, scroll } = this.props;
    return (
      <div className="scroll-potition-container" style={{ top: this.props.top }}>
        <ScrollPosition top={0} scroll={scroll.scrollY} height={scroll.height} />
        <LoadingStatus isLoading={page.loadingPages.length !== 0} />
      </div>
    );
  }
}

StatusBarContainer.defaultProps = {
  top: 0,
};

StatusBarContainer.propTypes = {
  top: PropTypes.number.isRequired,
};

export default StatusBarContainer;

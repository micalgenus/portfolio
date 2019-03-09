import React, { Component } from 'react';

import Introduce from '@/Components/Introduce';
import WorkExperience from '@/Components/WorkExperience';
import Projects from '@/Components/Projects';
import ToyProjects from '@/Components/ToyProjects';
import Educations from '@/Components/Educations';
import Contributes from '@/Components/Contributes';
import Others from '@/Components/Others';

export default class Main extends Component {
  componentDidMount = () => {
    if (this.props.hideLoading && typeof this.props.hideLoading === 'function') this.props.hideLoading();
  };

  render() {
    return (
      <>
        <Introduce />
        <WorkExperience />
        <Projects />
        <Educations />
        <ToyProjects />
        <Contributes />
        <Others />
      </>
    );
  }
}

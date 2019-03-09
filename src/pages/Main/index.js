import React from 'react';
import PageTemplate from '@/Pages';

import Introduce from '@/Components/Introduce';
import WorkExperience from '@/Components/WorkExperience';
import Projects from '@/Components/Projects';
import ToyProjects from '@/Components/ToyProjects';
import Educations from '@/Components/Educations';
import Contributes from '@/Components/Contributes';
import Others from '@/Components/Others';

export default class Main extends PageTemplate {
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

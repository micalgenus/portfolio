import TestComponent from '@/TestComponent';
import Projects from './Projects';

const ProjectsTest = new TestComponent({ name: '/Pages/Projects', component: Projects, snapshot: true });
ProjectsTest.run(null);

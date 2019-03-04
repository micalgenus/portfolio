import { lazy } from 'react';
import { homepage } from 'package.json';

const Main = lazy(() => import('@/Pages/Main'));
const Introduce = lazy(() => import('@/Pages/Introduce'));
const Projects = lazy(() => import('@/Pages/Projects'));

const parser = document.createElement('a');
parser.href = homepage || 'http://localhost:3000';

const pathPrefix = parser.pathname === '/' ? '' : parser.pathname;
const appendPrefix = path => pathPrefix + path;

export default [
  { title: '홈', Component: Main, path: '/', exact: true },
  { title: '소개', Component: Introduce, path: '/intro' },
  { title: '프로젝트', Component: Projects, path: '/projects' },
].map(v => ({ ...v, path: appendPrefix(v.path) }));

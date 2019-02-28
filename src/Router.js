import { lazy } from 'react';

const Main = lazy(() => import('@/Pages/Main'));
const Introduce = lazy(() => import('@/Pages/Introduce'));
const Projects = lazy(() => import('@/Pages/Projects'));

const pathPrefix = process.env.CI === true ? '/portfolio' : '';
const appendPrefix = path => pathPrefix + path;

export default [
  { title: '홈', Component: Main, path: '/', exact: true },
  { title: '소개', Component: Introduce, path: '/intro' },
  { title: '프로젝트', Component: Projects, path: '/projects' },
].map(v => ({ ...v, path: appendPrefix(v.path) }));

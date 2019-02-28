import { lazy } from 'react';

const Main = lazy(() => import('@/Pages/Main'));
const Introduce = lazy(() => import('@/Pages/Introduce'));

export default [{ title: '홈', Component: Main, path: '/', exact: true }, { title: '소개', Component: Introduce, path: '/intro' }];

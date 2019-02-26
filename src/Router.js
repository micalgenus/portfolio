import { lazy } from 'react';

const Main = lazy(() => import('./Pages/Main'));
const Introduce = lazy(() => import('./Pages/Introduce'));

export default [{ Component: Main, path: '/', exact: true }, { Component: Introduce, path: '/intro' }];

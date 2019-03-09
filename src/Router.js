import { lazy } from 'react';
import { homepage } from 'package.json';

const Main = lazy(() => import('@/Pages/Main'));

const parser = document.createElement('a');
parser.href = homepage || 'http://localhost:3000';

const pathPrefix = parser.pathname === '/' ? '' : parser.pathname;
export const appendPrefix = path => pathPrefix + path;

export default [{ title: '홈', Component: Main, path: '/', exact: true }].map(v => ({ ...v, path: appendPrefix(v.path) }));

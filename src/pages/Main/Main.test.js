import TestComponent from '@/TestComponent';
import Main from './Main';

const MainTest = new TestComponent({ name: '/Pages/Main', component: Main, snapshot: true });
MainTest.run(null);

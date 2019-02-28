import TestComponent from '@/TestComponent';
import App from './App';

const AppTest = new TestComponent({ name: '/App', component: App, snapshot: true });
AppTest.run(null);

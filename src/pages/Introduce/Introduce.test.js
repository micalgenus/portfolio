import TestComponent from '@/TestComponent';
import Introduce from './Introduce';

const IntroduceTest = new TestComponent({ name: '/Pages/Introduce', component: Introduce, snapshot: true });
IntroduceTest.run(null);

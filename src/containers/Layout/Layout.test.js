import { snapshotTest } from '@/TestComponent';
import Layout from './index';
import Routers from '@/Router';

snapshotTest('/Containers/Layout', Layout, { routers: Routers });

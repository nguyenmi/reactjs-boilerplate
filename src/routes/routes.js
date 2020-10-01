import {
  HomePage,
  Login
} from '../pages';

const routes = [
  { path: '/', exact: true, component: Login },
  { path: '/login', exact: true, layout: null, isRequiredLogin: false, component: HomePage }
];

export default routes;

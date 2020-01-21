import {
  HomePage,
  Login
} from '../pages';

const routes = [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', exact: true, layout: null, isRequiredLogin: false, component: Login }
];

export default routes;

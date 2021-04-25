import Vue from 'vue';
import VueRouter from 'vue-router';

import RegistryRoute from './Registry';
import PageNotFoundRoute from './404';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'RegistryIndex' },
  }
].concat(RegistryRoute, PageNotFoundRoute);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

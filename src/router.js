import Vue from 'vue';
import VueRouter from 'vue-router';
import * as internalUrls from './common/constants/internal-urls';

import Playground from './components/playground/Playground.vue';

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: internalUrls.PLAYGROUND },
    { path: internalUrls.PLAYGROUND, component: Playground, meta: { title: 'Playground' } },
    { path: '*', redirect: internalUrls.PLAYGROUND }
  ]
});

Router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default Router;

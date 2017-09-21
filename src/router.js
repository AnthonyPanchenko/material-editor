import Vue from 'vue';
import VueRouter from 'vue-router';
import internalUrls from './common/constants/internal-urls';

import MaterialEditor from './views/MaterialEditor.vue';
import ShaderEditor from './views/ShaderEditor.vue';
import NotFound from './views/NotFound.vue';

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: `/${internalUrls.MATERIAL_EDITOR}` },
    { path: `/${internalUrls.MATERIAL_EDITOR}`, component: MaterialEditor, meta: { title: 'Material Editor' } },
    { path: `/${internalUrls.SHADER_EDITOR}`, component: ShaderEditor, meta: { title: 'Shader Editor' } },
    { path: `/${internalUrls.NOT_FOUND}`, component: NotFound, meta: { title: 'Page not found' } },
    { path: '*', redirect: `/${internalUrls.NOT_FOUND}` },
  ],
});

Router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default Router;

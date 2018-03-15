import Vue from 'vue';
import VueRouter from 'vue-router';
import * as internalUrls from './common/constants/internal-urls';

import Playground from './components/playground/Playground.vue';
import ShadersGallery from './components/shaders-gallery/ShadersGallery.vue';
import MaterialEditor from './components/material-editor/MaterialEditor.vue';
import ShaderEditor from './components/shader-editor/ShaderEditor.vue';

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: internalUrls.PLAYGROUND },
    { path: internalUrls.PLAYGROUND, component: Playground, meta: { title: 'Playground' } },
    { path: internalUrls.MATERIAL_EDITOR, component: MaterialEditor, meta: { title: 'Material editor' } },
    { path: internalUrls.SHADERS_GALLERY, component: ShadersGallery, meta: { title: 'Shaders gallery' } },
    { path: internalUrls.SHADER_EDITOR, component: ShaderEditor, meta: { title: 'Shader editor' } },
    { path: '*', redirect: internalUrls.PLAYGROUND }
  ]
});

Router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default Router;

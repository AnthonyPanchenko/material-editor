import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import Router from './router';
import MainStore from './main-store';
import CodeEditorManager from './common/plugins/CodeEditorManager';
import MainLayout from './components/main-layout/MainLayout.vue';

import './main.scss';

sync(MainStore, Router);

Vue.use(CodeEditorManager);
Vue.use(VueResource);

// Vue.http.options.crossOrigin = true;
// Vue.http.options.xhr = { withCredentials: true };

// const token = localStorage.getItem('token');
// Vue.http.headers.common.Authorization = token ? `Bearer ${token}` : '';

// Vue.http.interceptors.push((request, next) => {
//   next((response) => {
//     if (response.status === 401) {
//       localStorage.removeItem('token');
//     }
//     return response;
//   });
// });

const App = new Vue({
  router: Router,
  store: MainStore,
  render: createElement => createElement(MainLayout)
});

App.$mount('#app');

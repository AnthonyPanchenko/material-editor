import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import Router from './router';
import MainStore from './main-store';
import MainLayout from './components/main-layout/MainLayout.vue';
import apiUrlParts from './common/constants/api-url-parts';
import * as api from './common/constants/api';
import fakeData from './fake-data';

import './main.scss';

sync(MainStore, Router);

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

// mock data
if (process.env.NODE_ENV !== 'production') {
  const data = {
    [`${apiUrlParts.MATERIAL_EDITOR_URL_PART}${apiUrlParts.GET_3D_MODELS_LIST_URL_SUFIX}`]: fakeData.itemObjects
  };

  Vue.http.interceptors.push((request, next) => {
    const url = request.getUrl();
    const key = url.replace(api.API_PATH, '');

    next(request.respondWith(data[key], {
      status: data[key] ? 200 : 500,
      ok: !!data[key]
    }));
  });
}

const App = new Vue({
  router: Router,
  store: MainStore,
  render: createElement => createElement(MainLayout)
});

App.$mount('#app');

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import Router from './router';
import MainStore from './main-store';
import { API_PATH } from './common/constants/api-constants';
import './common/components/custom-button';

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
    '/users': [{ id: 'qwwe1e234', name: 223, surname: 'qqq' }, { id: 're24w4wer', name: 456, surname: 'www' }, { id: 'ewr3t4rdg', name: 345, surname: 'rrr' }],
  };

  Vue.http.interceptors.push((request, next) => {
    const url = request.getUrl();
    const key = url.replace(API_PATH, '');

    next(request.respondWith(data[key], {
      status: data[key] ? 200 : 500,
      ok: !!data[key],
    }));
  });
}

const App = new Vue({
  router: Router,
  store: MainStore,
});

App.$mount('#app');

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import Router from './router';
import MainStore from './main-store';
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
// if (process.env.NODE_ENV !== 'production') {
//   const data = {
//     '/users/me': { me: 223 }, // some json
//     '/auth/local': { local: 4646 }, // some json
//   };

//   Vue.http.interceptors.push((request, next) => {
//     const url = request.getUrl();
//     const key = url.replace('/api', '');
//     console.log('request:', url, data[key]);
//     next(request.respondWith(data[key], {
//       status: data[key] ? 200 : 500,
//       ok: !!data[key],
//     }));
//   });
// }

const App = new Vue({
  router: Router,
  store: MainStore,
});

App.$mount('#app');

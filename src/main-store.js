import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    users,
  },
});

window.$store = MainStore;

export default MainStore;

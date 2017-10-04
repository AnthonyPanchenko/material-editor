import Vue from 'vue';
import Vuex from 'vuex';
import itemObjects from './components/item-obj-list/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    itemObjects,
  },
});

window.$store = MainStore;

export default MainStore;

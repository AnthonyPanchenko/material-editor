import Vue from 'vue';
import Vuex from 'vuex';
import itemObjects from './components/item-obj-list/vuex/store';
import materialEditor from './components/material-editor/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    itemObjects,
    shaderEditor,
    materialEditor,
  },
});

window.store = MainStore;

export default MainStore;

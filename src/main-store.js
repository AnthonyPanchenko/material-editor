import Vue from 'vue';
import Vuex from 'vuex';
import meshesList from './components/meshes-list/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';
import materialEditor from './components/material-editor/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    meshesList,
    shaderEditor,
    materialEditor
  }
});

// window.store = MainStore;

export default MainStore;

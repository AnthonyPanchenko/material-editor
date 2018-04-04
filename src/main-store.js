import Vue from 'vue';
import Vuex from 'vuex';
import playground from './components/playground/vuex/store';
import meshesList from './components/meshes-list/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';
import materialEditor from './components/material-editor/vuex/store';
import lightingEditor from './components/lighting-editor/vuex/store';
import particlesEditor from './components/particles-editor/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    playground,
    meshesList,
    shaderEditor,
    lightingEditor,
    particlesEditor,
    materialEditor
  }
});

// window.store = MainStore;

export default MainStore;

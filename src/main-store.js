import Vue from 'vue';
import Vuex from 'vuex';
import shadersGallery from './components/shaders-gallery/vuex/store';
import geometricObjects from './components/geometric-objects/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';
import materialEditor from './components/material-editor/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    shadersGallery,
    geometricObjects,
    shaderEditor,
    materialEditor
  }
});

// window.store = MainStore;

export default MainStore;

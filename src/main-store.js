import Vue from 'vue';
import Vuex from 'vuex';
import itemObjects from './components/item-obj-list/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';
import materialEditor from './components/material-editor/vuex/store';
import shaderEditorFooter from './components/shader-editor-footer/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    itemObjects,
    shaderEditor,
    materialEditor,
    shaderEditorFooter
  }
});

window.store = MainStore;

export default MainStore;

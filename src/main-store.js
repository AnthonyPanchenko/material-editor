import Vue from 'vue';
import Vuex from 'vuex';
import playground from './components/playground/vuex/store';
import shaderEditor from './components/shader-editor/vuex/store';
import ogmEditor from './components/ogm-editor/vuex/store';
import lightingEditor from './components/lighting-editor/vuex/store';
import particlesEditor from './components/particles-editor/vuex/store';

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  modules: {
    playground,
    shaderEditor,
    lightingEditor,
    particlesEditor,
    ogmEditor
  }
});

window.vuex = {
  getState: () => MainStore.state,
  getStore: () => MainStore
};

export default MainStore;

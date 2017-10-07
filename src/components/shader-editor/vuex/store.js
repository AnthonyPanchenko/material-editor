import actions from './actions';
import mutations from './mutations';
// import getters from './getters';

const shaderEditor = {
  namespaced: true,
  state: {
    shaders: [],
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    widthCtrlBox: 47,
  },
  actions,
  mutations,
  // getters,
};

export default shaderEditor;

import actions from './actions';
import mutations from './mutations';
// import getters from './getters';
import tabNames from '../constants/tabNames';

const shaderEditor = {
  namespaced: true,
  state: {
    shaders: [],
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    activeTabName: tabNames.FRAGMENT_SHADER,
    widthCtrlBox: 42,
  },
  actions,
  mutations,
  // getters,
};

export default shaderEditor;

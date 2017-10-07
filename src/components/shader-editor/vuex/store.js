import actions from './actions';
import mutations from './mutations';
// import getters from './getters';

const shaderEditor = {
  state: {
    shaders: [],
    isVisibleCtrlBox: true,
    widthCtrlBox: 45,
  },
  actions,
  mutations,
  // getters,
};

export default shaderEditor;

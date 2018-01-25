import actions from './actions';
import mutations from './mutations';
// import getters from './getters';
import shadersTypes from '../../../common/constants/shaders-types';

const shaderEditor = {
  namespaced: true,
  state: {
    shaders: {
      [shadersTypes.FRAGMENT_SHADER]: '',
      [shadersTypes.VERTEX_SHADER]: ''
    },
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    activeTabName: shadersTypes.FRAGMENT_SHADER,
    widthCtrlBox: 70 // 42
  },
  actions,
  mutations
  // getters
};

export default shaderEditor;

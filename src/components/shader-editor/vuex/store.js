import actions from './actions';
import mutations from './mutations';
// import getters from './getters';
import shadersTypes from '../../../common/constants/shaders-types';

const shaderEditor = {
  namespaced: true,
  state: {
    shaders: {
      [shadersTypes.FRAGMENT_SHADER]: 'uniform float u_time;',
      [shadersTypes.VERTEX_SHADER]: 'uniform vec2 u_resolution;'
    },
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    activeTabName: shadersTypes.FRAGMENT_SHADER,
    widthCtrlBox: 42
  },
  actions,
  mutations
  // getters
};

export default shaderEditor;

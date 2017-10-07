import actions from './actions';
import mutations from './mutations';
// import getters from './getters';

const materialEditor = {
  namespaced: true,
  state: {
    materials: [],
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    widthCtrlBox: 21,
  },
  actions,
  mutations,
  // getters,
};

export default materialEditor;

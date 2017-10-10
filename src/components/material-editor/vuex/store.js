import actions from './actions';
import mutations from './mutations';
// import getters from './getters';
import tabNames from '../constants/tabNames';

const materialEditor = {
  namespaced: true,
  state: {
    materials: [],
    isVisibleControlsBox: true,
    isVisibleObjectsList: true,
    activeTabName: tabNames.MATERIAL,
    widthCtrlBox: 21,
  },
  actions,
  mutations,
  // getters,
};

export default materialEditor;

import actions from './actions';
import mutations from './mutations';
// import getters from './getters';

const materialEditor = {
  state: {
    materials: [],
    isVisibleCtrlBox: true,
    widthCtrlBox: 30,
  },
  actions,
  mutations,
  // getters,
};

export default materialEditor;

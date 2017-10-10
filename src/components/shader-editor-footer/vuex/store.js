// import actions from './actions';
// import mutations from './mutations';
// import getters from './getters';
import tabNames from '../constants/tabNames';

const shaderEditorFooter = {
  namespaced: true,
  state: {
    isVisibleFooterContent: true,
    activeTabName: tabNames.UNIFORMS,
    footerContentHeight: 30,
  },
  // actions,
  // mutations,
  // getters,
};

export default shaderEditorFooter;

import actions from './actions';
import mutations from './mutations';
import state from './state';
// import getters from './getters';

const lightingEditor = {
  namespaced: true,
  state,
  actions,
  mutations
  // getters
};

export default lightingEditor;

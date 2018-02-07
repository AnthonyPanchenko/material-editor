import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const glslPrograms = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  mutations,
  getters
};

export default glslPrograms;

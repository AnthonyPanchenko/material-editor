import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const itemObjects = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  mutations,
  getters
};

export default itemObjects;

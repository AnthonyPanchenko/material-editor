import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const geometricObjects = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  mutations,
  getters
};

export default geometricObjects;

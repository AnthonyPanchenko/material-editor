import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const geometricObjectsList = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  mutations,
  getters
};

export default geometricObjectsList;

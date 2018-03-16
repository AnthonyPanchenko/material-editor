import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const meshesList = {
  namespaced: true,
  state: {
    list: []
  },
  actions,
  mutations,
  getters
};

export default meshesList;

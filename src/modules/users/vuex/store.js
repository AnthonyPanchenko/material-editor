import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const users = {
  state: {
    list: [],
  },
  actions,
  mutations,
  getters,
};

export default users;

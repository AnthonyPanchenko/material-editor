import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.REMOVE_USER_BY_ID](state, payload) {
    state.list = state.list.filter(item => item.id !== payload.id);
  },
  [mutationTypes.LOAD_USERS_LIST_SUCCESS](state, payload) {
    state.list = payload.list;
  },
};

export default mutations;

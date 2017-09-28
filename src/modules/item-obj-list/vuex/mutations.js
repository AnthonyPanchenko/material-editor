import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.REMOVE_ITEM_OBJ_BY_ID](state, payload) {
    state.list = state.list.filter(item => item.id !== payload.id);
  },
  [mutationTypes.LOAD_ITEM_OBJ_LIST_SUCCESS](state, payload) {
    state.list = payload.list;
  },
};

export default mutations;

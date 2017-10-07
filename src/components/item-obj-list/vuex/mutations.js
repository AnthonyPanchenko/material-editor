import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.REMOVE_ITEM_OBJ_BY_ID](state, objId) {
    state.list = state.list.filter(item => item.id !== objId);
  },
  [mutationTypes.LOAD_ITEM_OBJ_LIST_SUCCESS](state, list) {
    state.list = list;
  },
};

export default mutations;

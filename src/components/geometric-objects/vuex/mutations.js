import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.REMOVE_GEOMETRIC_OBJECT_BY_ID](state, objId) {
    state.list = state.list.filter(item => item.id !== objId);
  },
  [mutationTypes.LOAD_GEOMETRIC_OBJECTS_SUCCESS](state, list) {
    state.list = list;
  }
};

export default mutations;

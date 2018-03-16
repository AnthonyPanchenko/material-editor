import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.REMOVE_MESH_BY_ID](state, id) {
    state.list = state.list.filter(item => item.id !== id);
  }
};

export default mutations;

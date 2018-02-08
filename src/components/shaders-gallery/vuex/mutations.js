import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS](state, list) {
    state.list = list;
  }
};

export default mutations;

import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS](state, list) {
    state.list = list;
  },
  [mutationTypes.SHADERS_GALLERY_SET_ACTIVE_SHADER](state, payload) {
    state.activeShader = payload;
  }
};

export default mutations;

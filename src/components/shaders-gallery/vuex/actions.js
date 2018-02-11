import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSuccessLoadGlslPrograms(context, list) {
    context.commit(mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS, list);
  },
  onSetActiveShader(context, payload) {
    context.commit(mutationTypes.SHADERS_GALLERY_SET_ACTIVE_SHADER, payload);
  }
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSuccessLoadGlslPrograms(context, list) {
    context.commit(mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS, list);
  }
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';
import actionTypes from '../../../common/constants/action-types';

const actions = {
  [actionTypes.SHADER_EDITOR_ON_SET_CTRL_BOX_WIDTH](context, width) { // ({ commit, state })
    context.commit(mutationTypes.SHADER_EDITOR_SET_CTRL_BOX_WIDTH, width);
  },
};

export default actions;

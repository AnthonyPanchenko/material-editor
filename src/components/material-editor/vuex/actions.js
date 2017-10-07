import mutationTypes from '../../../common/constants/mutation-types';
import actionTypes from '../../../common/constants/action-types';

const actions = {
  [actionTypes.MATERIAL_EDITOR_ON_SET_CTRL_BOX_WIDTH](context, width) { // ({ commit, state })
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_CTRL_BOX_WIDTH, width);
  },
};

export default actions;

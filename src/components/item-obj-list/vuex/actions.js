import mutationTypes from '../../../common/constants/mutation-types';
import actionTypes from '../../../common/constants/action-types';

const actions = {
  [actionTypes.ON_REMOVE_ITEM_OBJ_BY_ID](context, payload) { // ({ commit, state })
    context.commit(mutationTypes.REMOVE_ITEM_OBJ_BY_ID, {
      id: payload.id,
    });
  },
};

export default actions;

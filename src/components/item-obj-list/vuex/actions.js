import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onRemoveItemObjById(context, objId) {
    context.commit(mutationTypes.REMOVE_ITEM_OBJ_BY_ID, objId);
  },
};

export default actions;

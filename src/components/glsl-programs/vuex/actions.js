import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onRemoveItemObjById(context, objId) {
    context.commit(mutationTypes.REMOVE_ITEM_OBJ_BY_ID, objId);
  },
  onSuccessLoadObjects(context, list) {
    context.commit(mutationTypes.LOAD_ITEM_OBJ_LIST_SUCCESS, list);
  }
};

export default actions;

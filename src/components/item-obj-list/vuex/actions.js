import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onRemoveItemObjById(context, event) {
    context.commit(mutationTypes.REMOVE_ITEM_OBJ_BY_ID, event.target.dataset.id);
  },
  onSuccessLoadObjectsList(context, list) {
    context.commit(mutationTypes.LOAD_ITEM_OBJ_LIST_SUCCESS, list);
  }
};

export default actions;

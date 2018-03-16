import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onRemoveGeometricObjectById(context, objId) {
    context.commit(mutationTypes.REMOVE_GEOMETRIC_OBJECT_BY_ID, objId);
  },
  onSuccessLoadGeometricObjects(context, list) {
    context.commit(mutationTypes.LOAD_GEOMETRIC_OBJECTS_SUCCESS, list);
  }
};

export default actions;

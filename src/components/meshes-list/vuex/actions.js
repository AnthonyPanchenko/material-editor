import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onRemoveMeshById(context, id) {
    context.commit(mutationTypes.REMOVE_MESH_BY_ID, id);
  }
};

export default actions;

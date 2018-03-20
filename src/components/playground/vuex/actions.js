import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  addGeometryToScene(context, geometry) {
    context.commit(mutationTypes.ADD_GEOMETRY_TO_SCENE, geometry);
  },
  onToggleMeshesList(context) {
    context.commit(mutationTypes.TOGGLE_MESHES_LIST);
  },
  onToggleCreateNewMaterialForm(context) {
    context.commit(mutationTypes.TOGGLE_CREATE_NEW_MATERIAL_FORM);
  }
};

export default actions;

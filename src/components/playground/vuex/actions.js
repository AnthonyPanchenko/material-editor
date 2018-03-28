import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  onSetTransformationMode(context, transformationMode) {
    context.commit(mutationTypes.SET_TRANSFORMATION_MODE, transformationMode);
  },
  onAddGeometryToScene(context, geometryType) {
    context.commit(mutationTypes.ADD_GEOMETRY_TO_SCENE, geometryType);
  },
  onToggleMeshesList(context) {
    context.commit(mutationTypes.TOGGLE_MESHES_LIST);
  },
  onToggleCreateNewMaterialForm(context) {
    context.commit(mutationTypes.TOGGLE_CREATE_NEW_MATERIAL_FORM);
  }
};

export default actions;

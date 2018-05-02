import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetTransformationMode(context, transformationMode) {
    context.commit(mutationTypes.SET_TRANSFORMATION_MODE, transformationMode);
  },
  onAddObjectToScene(context, type) {
    context.commit(mutationTypes.ADD_GEOMETRY_TO_SCENE, type);
  },
  onToggleMeshesList(context) {
    context.commit(mutationTypes.TOGGLE_MESHES_LIST);
  },
  onToggleOpenGallery(context) {
    context.commit(mutationTypes.TOGGLE_OPEN_GALLERY);
  },
  onSetActiveEditorName(context, editorName) {
    context.commit(mutationTypes.SET_ACTIVE_EDITOR_NAME, editorName);
  },
  onSetObjectPropertyValue(context, payload) {
    context.commit(mutationTypes.SET_OBJECT_PROPERTY_VALUE, payload);
  },
  onSetGeometryPropertyValue(context, payload) {
    context.commit(mutationTypes.SET_GEOMETRY_PROPERTY_VALUE, payload);
  },
  onSetMaterialPropertyValue(context, payload) {
    context.commit(mutationTypes.SET_MATERIAL_PROPERTY_VALUE, payload);
  }
};

export default actions;

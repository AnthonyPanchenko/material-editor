import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  onSetTransformationMode(context, transformationMode) {
    context.commit(mutationTypes.SET_TRANSFORMATION_MODE, transformationMode);
  },
  onAddObjectToScene(context, type) {
    context.commit(mutationTypes.ADD_OBJECT_TO_SCENE, type);
  },
  onToggleMeshesList(context) {
    context.commit(mutationTypes.TOGGLE_MESHES_LIST);
  },
  onToggleOpenGallery(context) {
    context.commit(mutationTypes.TOGGLE_OPEN_GALLERY);
  }
};

export default actions;

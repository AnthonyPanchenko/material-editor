import editorsNames from '../../../common/constants/editors-names';
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
  onOpenShaderEditor(context) {
    context.commit(mutationTypes.SET_ACTIVE_EDITOR_TYPE, editorsNames.SHADER_EDITOR);
  },
  onOpenOgmEditor(context) {
    context.commit(mutationTypes.SET_ACTIVE_EDITOR_TYPE, editorsNames.OGM_EDITOR);
  },
  onOpenLightingEditor(context) {
    context.commit(mutationTypes.SET_ACTIVE_EDITOR_TYPE, editorsNames.LIGHTING_EDITOR);
  },
  onOpenParticlesEditor(context) {
    context.commit(mutationTypes.SET_ACTIVE_EDITOR_TYPE, editorsNames.PARTICLES_EDITOR);
  }
};

export default actions;

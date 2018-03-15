import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetControlsPanelWidth(context, width) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH, width);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveMaterialType(context, payload) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE, payload);
  },
  onSuccessLoadMaterials(context, list) {
    context.commit(mutationTypes.MATERIAL_EDITOR_LOAD_MATERIALS_SUCCESS, list);
  },
  onSelectMaterial(context, payload) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_SELECTED_MATERIAL, payload);
  }
};

export default actions;

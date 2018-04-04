import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetControlsPanelWidth(context, width) {
    context.commit(mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_MATERIAL_EDITOR, width);
  },
  onSetActiveMaterialTypeId(context, payload) {
    context.commit(mutationTypes.SET_ACTIVE_MATERIAL_TYPE_ID, payload.id);
  },
  onSuccessLoadMaterials(context, list) {
    context.commit(mutationTypes.LOAD_MATERIALS_SUCCESS, list);
  },
  onSelectMaterial(context, payload) {
    context.commit(mutationTypes.SET_SELECTED_MATERIAL, payload);
  },
  onSetActiveSectionName(context, sectionName) {
    context.commit(mutationTypes.SET_ACTIVE_SECTION_NAME, sectionName);
  }
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetControlsPanelWidth(context, width) {
    context.commit(mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_OGM_EDITOR, width);
  },
  onSetActiveMaterialTypeId(context, id) {
    context.commit(mutationTypes.SET_ACTIVE_MATERIAL_TYPE_ID, id);
  },
  onSuccessLoadMaterials(context, list) {
    context.commit(mutationTypes.LOAD_MATERIALS_SUCCESS, list);
  },
  onSelectMaterial(context, payload) {
    context.commit(mutationTypes.SET_SELECTED_MATERIAL, payload);
  }
};

export default actions;

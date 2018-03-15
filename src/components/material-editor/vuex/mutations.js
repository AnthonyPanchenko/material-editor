import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH](state, width) {
    state.controlsPanelWidth = width;
  },
  [mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE](state, payload) {
    state.activeMaterialType = payload.id;
  },
  [mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleObjectsList = !state.isVisibleControlsPanel && state.isVisibleObjectsList;
    state.isVisibleControlsPanel = !state.isVisibleControlsPanel;
  },
  [mutationTypes.MATERIAL_EDITOR_LOAD_MATERIALS_SUCCESS](state, list) {
    state.materialsList = list;
  },
  [mutationTypes.MATERIAL_EDITOR_SET_SELECTED_MATERIAL](state, payload) {
    state.selectedMaterial = payload;
  }
};

export default mutations;

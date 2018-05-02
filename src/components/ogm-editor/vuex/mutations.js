import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_OGM_EDITOR](state, width) {
    state.controlsPanelWidth = width;
  },
  [mutationTypes.SET_ACTIVE_MATERIAL_TYPE_ID](state, id) {
    state.activeMaterialTypeId = id;
  },
  [mutationTypes.LOAD_MATERIALS_SUCCESS](state, list) {
    state.materialsList = list;
  },
  [mutationTypes.SET_SELECTED_MATERIAL](state, payload) {
    state.selectedMaterial = payload;
  }
};

export default mutations;

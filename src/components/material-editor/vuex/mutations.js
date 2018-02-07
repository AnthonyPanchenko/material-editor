import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH](state, width) {
    state.controlsPanelWidth = width;
  },
  [mutationTypes.MATERIAL_EDITOR_TOGGLE_OBJECTS_LIST](state) {
    state.isVisibleObjectsList = !state.isVisibleObjectsList;
  },
  [mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE](state, payload) {
    state.activeMaterialType = payload.id;
  },
  [mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_OBJ_INFO_TAB_NAME](state, tabName) {
    state.activeObjInfoTabName = tabName;
  },
  [mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleObjectsList = !state.isVisibleControlsPanel && state.isVisibleObjectsList;
    state.isVisibleControlsPanel = !state.isVisibleControlsPanel;
  }
};

export default mutations;

import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH](state, width) {
    state.widthCtrlBox = width;
  },
  [mutationTypes.MATERIAL_EDITOR_TOGGLE_OBJECTS_LIST](state) {
    state.isVisibleObjectsList = !state.isVisibleObjectsList;
  },
  [mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE](state, activeTabName) {
    state.activeTabName = activeTabName;
  },
  [mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleObjectsList = !state.isVisibleControlsPanel && state.isVisibleObjectsList;
    state.isVisibleControlsPanel = !state.isVisibleControlsPanel;
  }
};

export default mutations;

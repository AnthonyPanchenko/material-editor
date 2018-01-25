import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_SHADER_VALUE_BY_TYPE](state, payload) {
    state.shaders[payload.type] = payload.value;
  },
  [mutationTypes.SET_CTRL_BOX_WIDTH](state, width) {
    state.widthCtrlBox = width;
  },
  [mutationTypes.SHOW_HIDE_OBJECTS_LIST](state) {
    state.isVisibleObjectsList = !state.isVisibleObjectsList;
  },
  [mutationTypes.SET_ACTIVE_TAB_NAME](state, activeTabName) {
    state.activeTabName = activeTabName;
  },
  [mutationTypes.TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleObjectsList = !state.isVisibleControlsBox && state.isVisibleObjectsList;
    state.isVisibleControlsBox = !state.isVisibleControlsBox;
  }
};

export default mutations;

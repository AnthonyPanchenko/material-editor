import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SHADER_EDITOR_SET_SHADER_VALUE_BY_TYPE](state, payload) {
    state.shaders[payload.type].value = payload.value;
  },
  [mutationTypes.SHADER_EDITOR_SET_PANEL_CONTROLS_WIDTH](state, width) {
    state.controlsPanelWidth = width;
  },
  [mutationTypes.SHADER_EDITOR_TOGGLE_OBJECTS_LIST](state) {
    state.isVisibleObjectsList = !state.isVisibleObjectsList;
  },
  [mutationTypes.SHADER_EDITOR_SET_ACTIVE_SHADER_TYPE](state, shaderType) {
    state.activeShaderType = shaderType;
  },
  [mutationTypes.SHADER_EDITOR_TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleObjectsList = !state.isVisibleControlsPanel && state.isVisibleObjectsList;
    state.isVisibleControlsPanel = !state.isVisibleControlsPanel;
  },
  [mutationTypes.SHADER_EDITOR_TOGGLE_FOOTER_CONTROLS](state) {
    state.isVisibleControlsFooter = !state.isVisibleControlsFooter;
  },
  [mutationTypes.SHADER_EDITOR_SET_ACTIVE_CONTROLS_TYPE](state, cotrolsType) {
    state.activeControlsType = cotrolsType;
  },
  [mutationTypes.SHADER_EDITOR_SET_FOOTER_CONTROLS_HEIGHT](state, height) {
    state.footerHeight = height;
  }
};

export default mutations;

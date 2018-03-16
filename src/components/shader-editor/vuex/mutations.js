import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_SHADER_VALUE_BY_TYPE](state, payload) {
    state.shaders[payload.type].value = payload.value;
  },
  [mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_SHADER_EDITOR](state, width) {
    state.controlsPanelWidth = width;
  },
  [mutationTypes.SET_ACTIVE_SHADER_TYPE](state, shaderType) {
    state.activeShaderType = shaderType;
  },
  [mutationTypes.TOGGLE_FOOTER_CONTROLS](state) {
    state.isVisibleControlsFooter = !state.isVisibleControlsFooter;
  },
  [mutationTypes.SET_ACTIVE_CONTROLS_TYPE](state, cotrolsType) {
    state.activeControlsType = cotrolsType;
  },
  [mutationTypes.SET_FOOTER_CONTROLS_HEIGHT](state, height) {
    state.footerHeight = height;
  },
  [mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS](state, list) {
    state.glslProgramsList = list;
  },
  [mutationTypes.SET_SELECTED_GLSL_PROGRAM](state, payload) {
    state.selectedGlslprogram = payload;
  }
};

export default mutations;

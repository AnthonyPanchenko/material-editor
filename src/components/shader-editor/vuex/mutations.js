import mutationTypes from '../../../common/constants/mutation-types';
import newControlsInitStates from '../utils/newControlsInitStates';

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
  [mutationTypes.SET_ACTIVE_CONTROL_TYPE](state, payload) {
    state.activeControlType[payload.shaderType] = payload.cotrolType;
  },
  [mutationTypes.TOGGLE_CREATE_NEW_CONTROL_AREA](state, payload) {
    if (Object.keys(state.newControl[payload.shaderType][payload.cotrolType]).length) {
      state.newControl[payload.shaderType][payload.cotrolType] = {};
    } else {
      state.newControl[payload.shaderType][payload.cotrolType] = { ...newControlsInitStates[payload.cotrolType] };
    }
  },
  [mutationTypes.SET_FOOTER_CONTROLS_HEIGHT](state, height) {
    state.footerHeight = height;
  }
};

export default mutations;

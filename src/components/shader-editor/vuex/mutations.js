import mutationTypes from '../../../common/constants/mutation-types';
import newControlsInitStates from '../utils/newControlsInitStates';

const mutations = {
  [mutationTypes.NEW_CONTROL_SET_VALUE](state, payload) {
    state.newControl[state.activeShaderType][state.activeControlType[state.activeShaderType]][payload.fieldName] = payload.value;
  },
  [mutationTypes.SET_SHADER_VALUE_BY_TYPE](state, value) {
    state.shaders[state.activeShaderType] = value;
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
  [mutationTypes.SET_ACTIVE_CONTROL_TYPE](state, cotrolType) {
    state.activeControlType[state.activeShaderType] = cotrolType;
  },
  [mutationTypes.TOGGLE_CREATE_NEW_CONTROL_AREA](state, cotrolType) {
    if (Object.keys(state.newControl[state.activeShaderType][cotrolType]).length) {
      state.newControl[state.activeShaderType][cotrolType] = {};
    } else {
      state.newControl[state.activeShaderType][cotrolType] = { ...newControlsInitStates[cotrolType] };
    }
  },
  [mutationTypes.SET_FOOTER_CONTROLS_HEIGHT](state, height) {
    state.footerHeight = height;
  }
};

export default mutations;

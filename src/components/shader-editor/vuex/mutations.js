import mutationTypes from '../../../common/constants/mutation-types';
import newControlsInitStates from '../utils/new-controls-init-states';
import controlsInitValues from '../utils/controls-init-values';

const mutations = {
  [mutationTypes.NEW_CONTROL_SET_VALUE](state, payload) {
    const itemCtrl = state.newControl[state.activeShaderType][state.activeControlType[state.activeShaderType]];

    itemCtrl[payload.fieldName] = payload.value;

    if (payload.fieldName === 'dataType') {
      itemCtrl.value = controlsInitValues[payload.value];
    }
  },
  [mutationTypes.CONTROL_SET_VALUE](state, payload) {
    const itemCtrl = state.controls[state.activeShaderType][payload.id];

    itemCtrl[payload.fieldName] = payload.value;

    if (payload.fieldName === 'dataType') {
      itemCtrl.value = controlsInitValues[payload.value];
    }
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
  [mutationTypes.NEW_CONTROL_TOGGLE_CREATE_MODE](state, cotrolType) {
    if (Object.keys(state.newControl[state.activeShaderType][cotrolType]).length) {
      state.newControl[state.activeShaderType][cotrolType] = {};
    } else {
      state.newControl[state.activeShaderType][cotrolType] = { ...newControlsInitStates[cotrolType] };
    }
  },
  [mutationTypes.SET_FOOTER_CONTROLS_HEIGHT](state, height) {
    state.footerHeight = height;
  },
  [mutationTypes.CONTROL_CANCEL_EDIT](state, id) {
    state.controls[state.activeShaderType][id] = {...state.controlsCopies[state.activeShaderType][id]};
    state.editableControlsIds = state.editableControlsIds.filter(ctrlId => ctrlId !== id);

    let copiesObject = {...state.controlsCopies[state.activeShaderType]};
    delete copiesObject[id];

    state.controlsCopies[state.activeShaderType] = {...copiesObject};
    copiesObject = null;
  },
  [mutationTypes.CONTROL_SET_EDIT](state, id) {
    state.controlsCopies[state.activeShaderType][id] = {...state.controls[state.activeShaderType][id]};
    state.editableControlsIds = [...state.editableControlsIds, id];
  },
  [mutationTypes.CONTROL_REMOVE](state, id) {
    let copiesArray = [...state.controlsIds[state.activeShaderType][state.activeControlType[state.activeShaderType]]];
    state.controlsIds[state.activeShaderType][state.activeControlType[state.activeShaderType]] = copiesArray.filter(objId => objId !== id);
    copiesArray = null;

    let copiesObject = {...state.controls[state.activeShaderType]};
    delete copiesObject[id];

    state.controls[state.activeShaderType] = {...copiesObject};
    copiesObject = null;
  }
};

export default mutations;

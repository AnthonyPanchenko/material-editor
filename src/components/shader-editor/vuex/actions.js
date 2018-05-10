import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onChangeCodeEditor(context, value) {
    context.commit(mutationTypes.SET_SHADER_VALUE_BY_TYPE, value);
  },
  onSetPanelControlsWidth(context, width) {
    context.commit(mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_SHADER_EDITOR, width);
  },
  onSetActiveShaderType(context, shaderType) {
    context.commit(mutationTypes.SET_ACTIVE_SHADER_TYPE, shaderType);
  },
  onToggleFooterControls(context) {
    context.commit(mutationTypes.TOGGLE_FOOTER_CONTROLS);
  },
  onSetFooterControlsHeight(context, height) {
    context.commit(mutationTypes.SET_FOOTER_CONTROLS_HEIGHT, height);
  },
  onSetActiveControlType(context, cotrolsType) {
    context.commit(mutationTypes.SET_ACTIVE_CONTROL_TYPE, cotrolsType);
  },
  onToggleCreateNewControlArea(context, cotrolsType) {
    context.commit(mutationTypes.NEW_CONTROL_TOGGLE_CREATE_MODE, cotrolsType);
  },
  onRemoveControl(context, id) {
    context.commit(mutationTypes.CONTROL_REMOVE, id);
  },
  onSaveShader(context, cotrolsType) {
    context.commit(mutationTypes.SAVE_SHADER, cotrolsType);
  },
  onChangeControlValue(context, payload) {
    context.commit(mutationTypes.CONTROL_SET_VALUE, payload);
  },
  onChangeNewControlValue(context, payload) {
    context.commit(mutationTypes.NEW_CONTROL_SET_VALUE, payload);
  },
  onSaveEditedControl(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_SAVE_EDITED, cotrolsType);
  },
  onSaveNewControl(context, cotrolsType) {
    context.commit(mutationTypes.NEW_CONTROL_SAVE, cotrolsType);
  },
  onCancelEditControl(context, id) {
    context.commit(mutationTypes.CONTROL_CANCEL_EDIT, id);
  },
  onSetEditControl(context, id) {
    context.commit(mutationTypes.CONTROL_SET_EDIT, id);
  }
};

export default actions;

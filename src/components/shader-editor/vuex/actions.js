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
    context.commit(mutationTypes.TOGGLE_CREATE_NEW_CONTROL_AREA, cotrolsType);
  },
  onRemoveControl(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_REMOVE, cotrolsType);
  },
  onSaveShader(context, cotrolsType) {
    context.commit(mutationTypes.SAVE_SHADER, cotrolsType);
  },
  onChangeControlValue(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_SET_VALUE, cotrolsType);
  },
  onChangeNewControlValue(context, cotrolsType) {
    context.commit(mutationTypes.NEW_CONTROL_SET_VALUE, cotrolsType);
  },
  onCancelEditControl(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_CANCEL_EDIT, cotrolsType);
  },
  onCancelCreateNewControl(context, cotrolsType) {
    context.commit(mutationTypes.NEW_CONTROL_CANCEL_CREATE, cotrolsType);
  },
  onSaveEditedControl(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_SAVE_EDITED, cotrolsType);
  },
  onSaveNewControl(context, cotrolsType) {
    context.commit(mutationTypes.NEW_CONTROL_SAVE, cotrolsType);
  },
  onSetEditControl(context, cotrolsType) {
    context.commit(mutationTypes.CONTROL_SET_EDIT, cotrolsType);
  }
};

export default actions;

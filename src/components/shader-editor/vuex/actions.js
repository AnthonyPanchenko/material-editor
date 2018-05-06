import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onChangeCodeEditor(context, payload) {
    context.commit(mutationTypes.SET_SHADER_VALUE_BY_TYPE, payload);
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
  onSetActiveControlType(context, payload) {
    context.commit(mutationTypes.SET_ACTIVE_CONTROL_TYPE, payload);
  },
  onToggleCreateNewControlArea(context, payload) {
    context.commit(mutationTypes.TOGGLE_CREATE_NEW_CONTROL_AREA, payload);
  },

  onCreateControl(context, cotrolsType) {
    context.commit(mutationTypes.CREATE_CONTROL, cotrolsType);
  },
  onCancelCreateControl(context, cotrolsType) {
    context.commit(mutationTypes.CANCEL_CREATE_CONTROL, cotrolsType);
  },
  onRemoveControl(context, cotrolsType) {
    context.commit(mutationTypes.REMOVE_CONTROL, cotrolsType);
  },

  onSaveShader(context, cotrolsType) {
    context.commit(mutationTypes.SAVE_SHADER, cotrolsType);
  },
  onChangeControlValue(context, cotrolsType) {
    context.commit(mutationTypes.SET_CONTROL_VALUE, cotrolsType);
  },
  onEditControl(context, cotrolsType) {
    context.commit(mutationTypes.SET_EDIT_CONTROL, cotrolsType);
  }
};

export default actions;

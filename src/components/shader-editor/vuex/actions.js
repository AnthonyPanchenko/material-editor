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
  onSetActiveControlsType(context, cotrolsType) {
    context.commit(mutationTypes.SET_ACTIVE_CONTROLS_TYPE, cotrolsType);
  },
  onSetFooterControlsHeight(context, height) {
    context.commit(mutationTypes.SET_FOOTER_CONTROLS_HEIGHT, height);
  },
  onSuccessLoadGlslPrograms(context, list) {
    context.commit(mutationTypes.LOAD_GLSL_PROGRAMS_SUCCESS, list);
  },
  onSelectGlslProgram(context, payload) {
    context.commit(mutationTypes.SET_SELECTED_GLSL_PROGRAM, payload);
  }
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onChangeCodeEditor(context, payload) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_SHADER_VALUE_BY_TYPE, payload);
  },
  onSetPanelControlsWidth(context, width) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_PANEL_CONTROLS_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.SHADER_EDITOR_TOGGLE_OBJECTS_LIST);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.SHADER_EDITOR_TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveShaderType(context, shaderType) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_ACTIVE_SHADER_TYPE, shaderType);
  },
  onToggleFooterControls(context) {
    context.commit(mutationTypes.SHADER_EDITOR_TOGGLE_FOOTER_CONTROLS);
  },
  onSetActiveControlsType(context, cotrolsType) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_ACTIVE_CONTROLS_TYPE, cotrolsType);
  },
  onSetFooterControlsHeight(context, height) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_FOOTER_CONTROLS_HEIGHT, height);
  }
};

export default actions;

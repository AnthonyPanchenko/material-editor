import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onChangeCodeEditor(context, payload) {
    context.commit(mutationTypes.SET_SHADER_VALUE_BY_TYPE, payload);
  },
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.SET_CTRL_BOX_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.SHOW_HIDE_OBJECTS_LIST);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveTabName(context, tabName) {
    context.commit(mutationTypes.SET_ACTIVE_TAB_NAME, tabName);
  }
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.SET_CTRL_BOX_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.SHOW_HIDE_OBJECTS_LIST);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveTabName(context, activeTabName) {
    context.commit(mutationTypes.SET_ACTIVE_TAB_NAME, activeTabName);
  },
};

export default actions;

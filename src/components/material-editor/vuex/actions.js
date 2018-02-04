import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.MATERIAL_EDITOR_TOGGLE_OBJECTS_LIST);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveTabName(context, activeTabName) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE, activeTabName);
  }
};

export default actions;

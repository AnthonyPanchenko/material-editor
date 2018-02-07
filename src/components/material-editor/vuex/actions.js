import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetControlsPanelWidth(context, width) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_PANEL_CONTROLS_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.MATERIAL_EDITOR_TOGGLE_OBJECTS_LIST);
  },
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.MATERIAL_EDITOR_TOGGLE_FULLSCREEN_MODE);
  },
  onSetActiveMaterialType(context, payload) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_MATERIAL_TYPE, payload);
  },
  onSetActiveObjInfoTabName(context, tabName) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_ACTIVE_OBJ_INFO_TAB_NAME, tabName);
  }
};

export default actions;

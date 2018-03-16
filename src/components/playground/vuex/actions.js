import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onToggleFullScreenMode(context) {
    context.commit(mutationTypes.TOGGLE_FULLSCREEN_MODE);
  },
  onToggleMeshesList(context) {
    context.commit(mutationTypes.TOGGLE_MESHES_LIST);
  },
  onToggleCreateNewMaterialForm(context) {
    context.commit(mutationTypes.TOGGLE_CREATE_NEW_MATERIAL_FORM);
  }
};

export default actions;

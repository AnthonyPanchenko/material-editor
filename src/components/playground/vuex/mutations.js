import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.TOGGLE_FULLSCREEN_MODE](state) {
    state.isVisibleMeshesList = !state.isVisibleControlsPanel && state.isVisibleMeshesList;
    state.isVisibleControlsPanel = !state.isVisibleControlsPanel;
  },
  [mutationTypes.TOGGLE_MESHES_LIST](state) {
    state.isVisibleMeshesList = !state.isVisibleMeshesList;
  },
  [mutationTypes.TOGGLE_CREATE_NEW_MATERIAL_FORM](state) {
    state.isOpenCreateNewMaterialForm = !state.isOpenCreateNewMaterialForm;
  }
};

export default mutations;

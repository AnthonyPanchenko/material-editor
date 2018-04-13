import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_TRANSFORMATION_MODE](state, transformationMode) {
    state.transformationMode = transformationMode;
  },
  [mutationTypes.SET_ACTIVE_EDITOR_TYPE](state, type) {
    state.currentVisibleEditor = type;
  },
  [mutationTypes.TOGGLE_MESHES_LIST](state) {
    state.isVisibleMeshesList = !state.isVisibleMeshesList;
  },
  [mutationTypes.TOGGLE_OPEN_GALLERY](state) {
    state.isOpenGallery = !state.isOpenGallery;
  },
  [mutationTypes.SET_EDITABLE_OBJECT_IDS](state, obj) {
    state.currentEditableIds = {
      objectId: obj && obj.uuid || '',
      geometryId: obj && obj.geometry || '',
      materialId: obj && obj.material || ''
    };
  }
};

export default mutations;

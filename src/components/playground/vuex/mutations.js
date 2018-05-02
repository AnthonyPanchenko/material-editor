import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_TRANSFORMATION_MODE](state, transformationMode) {
    state.transformationMode = transformationMode;
  },
  [mutationTypes.SET_ACTIVE_EDITOR_NAME](state, editorName) {
    state.activeEditorName = editorName;
  },
  [mutationTypes.SET_OBJECT_PROPERTY_VALUE](state, payload) {
    state.objects[state.activeEditableIds.objectId][payload.propName] = payload.newVal;
  },
  [mutationTypes.SET_GEOMETRY_PROPERTY_VALUE](state, payload) {
    state.geometries[state.activeEditableIds.geometryId][payload.propName] = payload.newVal;
  },
  [mutationTypes.SET_MATERIAL_PROPERTY_VALUE](state, payload) {
    state.materials[state.activeEditableIds.materialId][payload.propName] = payload.newVal;
  },
  [mutationTypes.TOGGLE_MESHES_LIST](state) {
    state.isVisibleMeshesList = !state.isVisibleMeshesList;
  },
  [mutationTypes.TOGGLE_OPEN_GALLERY](state) {
    state.isOpenGallery = !state.isOpenGallery;
  },
  [mutationTypes.SET_EDITABLE_OBJECT_IDS](state, obj) {
    state.activeEditableIds = {
      objectId: obj && obj.uuid || '',
      geometryId: obj && obj.geometry || '',
      materialId: obj && obj.material || ''
    };
  }
};

export default mutations;

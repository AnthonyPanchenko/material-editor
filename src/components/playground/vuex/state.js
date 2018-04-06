import editorsNames from '../../../common/constants/editors-names';
import transformationsModes from '../../../common/constants/transformations-modes';

const state = {
  objectToScene: null,
  isOpenGallery: false,
  isVisibleMeshesList: true,
  transformationMode: transformationsModes.TRANSLATE,
  currentVisibleEditor: editorsNames.MATERIAL_EDITOR,
  currentEditableIds: {
    objectId: '',
    geometryId: '',
    materialId: ''
  },
  geometries: {},
  materials: {},
  objects: {}
};

export default state;

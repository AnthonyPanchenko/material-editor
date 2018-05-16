import editorsNames from '../../../common/constants/editors-names';
import transformationsModes from '../../../common/constants/transformations-modes';

const state = {
  isOpenGallery: false,
  isVisibleMeshesList: false,
  transformationMode: transformationsModes.TRANSLATE,
  activeEditorName: editorsNames.SHADER_EDITOR,
  activeEditableIds: {
    objectId: '',
    geometryId: '',
    materialId: ''
  },
  geometries: {},
  materials: {},
  objects: {}
};

export default state;

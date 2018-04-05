import editorsNames from '../../../common/constants/editors-names';
import transformationsModes from '../../../common/constants/transformations-modes';

const state = {
  objectToScene: null,
  isVisibleMeshesList: true,
  isVisibleControlsPanel: true,
  isOpenCreateNewMaterialForm: false,
  transformationMode: transformationsModes.TRANSLATE,
  currentVisibleEditor: editorsNames.MATERIAL_EDITOR,
  currentEditableIds: {
    objectId: '',
    geometryId: '',
    materialId: ''
  },
  scene: {
    geometries: {},
    materials: {},
    objects: {}
  }
};

export default state;

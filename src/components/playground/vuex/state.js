import editorsNames from '../../../common/constants/editors-names';
import transformationsModes from '../../../common/constants/transformations-modes';

const state = {
  objectToScene: null,
  isVisibleMeshesList: true,
  isVisibleControlsPanel: true,
  isOpenCreateNewMaterialForm: false,
  transformationMode: transformationsModes.TRANSLATE,
  currentVisibleEditor: editorsNames.MATERIALS_EDITOR,
  currentEditableObject: {
    _id: 'asdfsdfsdfsfsdf',
    geometries: [],
    materials: [],
    objects: []
  }
};

export default state;

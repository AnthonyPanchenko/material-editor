import transformationsModes from '../../../common/constants/transformations-modes';

const state = {
  transformationMode: transformationsModes.TRANSLATE,
  geometryToScene: null,
  isVisibleControlsPanel: true,
  isVisibleMeshesList: true,
  isOpenCreateNewMaterialForm: false,
  geometries: [],
  materials: [],
  objects: []
};

export default state;

import materialsTypes from '../../../common/constants/materials-types';
import sections from '../../../common/constants/material-editor-sections';

const state = {
  materials: [],
  isVisibleControlsPanel: true,
  isVisibleMeshesList: true,
  isOpenCreateNewMaterialForm: true,
  activeObjInfoTabName: sections.MATERIAL,
  controlsPanelWidth: 20,
  activeMaterialType: materialsTypes.MESH_BASIC_MATERIAL
};

export default state;

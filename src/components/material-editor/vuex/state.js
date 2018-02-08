import materialsTypes from '../../../common/constants/materials-types';
import tabNames from '../constants/tabNames';

const state = {
  materials: [],
  isVisibleControlsPanel: true,
  isVisibleObjectsList: true,
  activeObjInfoTabName: tabNames.MATERIAL,
  widthControlsPanel: 21,
  activeMaterialType: materialsTypes.MESH_BASIC_MATERIAL
};

export default state;

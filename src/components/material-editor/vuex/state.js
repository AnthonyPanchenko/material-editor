import materialsTypes from '../../../common/constants/materials-types';

const state = {
  materialsList: [],
  selectedMaterial: null,

  isVisibleControlsPanel: true,
  controlsPanelWidth: 20,
  activeMaterialType: materialsTypes.MESH_BASIC_MATERIAL
};

export default state;

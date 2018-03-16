import materialsTypes from '../../../common/constants/materials-types';
import sections from '../../../common/constants/material-editor-sections';

const state = {
  materialsList: [],
  selectedMaterial: null,
  activeSectionName: sections.MATERIAL,
  controlsPanelWidth: 30,
  activeMaterialType: materialsTypes.MESH_BASIC_MATERIAL
};

export default state;

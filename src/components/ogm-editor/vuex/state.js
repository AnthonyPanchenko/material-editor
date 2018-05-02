import materialsTypes from '../../../common/constants/materials-types';
import editorsNames from '../../../common/constants/editors-names';

const state = {
  materialsList: [],
  selectedMaterial: null,
  activeEditorName: editorsNames.MATERIAL_EDITOR,
  controlsPanelWidth: 30,
  activeMaterialTypeId: materialsTypes.MESH_BASIC_MATERIAL
};

export default state;

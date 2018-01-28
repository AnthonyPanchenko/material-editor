<script>
import materialsTypes from '../../common/constants/materials-types';

import MaterialControls from './MaterialControls.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import InputText from '../../common/components/input-text/InputText.vue';

export default {
  name: 'MaterialSection',
  components: {
    MaterialControls,
    CustomSelect,
    InputText
  },
  data() {
    return {
      activeMaterialType: materialsTypes.MESH_BASIC_MATERIAL,
      materialsTypesOptions: Object.keys(materialsTypes).map(key => ({ title: materialsTypes[key], id: materialsTypes[key] }))
    };
  },
  methods: {
    onChangeMaterialsTypesSelect(selectedOption, name) {
      console.log(selectedOption, name);
      this.activeMaterialType = selectedOption.id;
    },
  }
};
</script>

<template>
  <div class="fieldset">
    <div class="type">
      <span class="label">Type:</span>
      <custom-select :options="materialsTypesOptions" :onChange="onChangeMaterialsTypesSelect" />
    </div>
    <div class="name">
      <span class="label">Name:</span>
      <input-text value="MeshBasicMaterial" />
    </div>

    <material-controls :materialTypeId="activeMaterialType" />
  </div>
</template>

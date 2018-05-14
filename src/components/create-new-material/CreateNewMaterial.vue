<template>
  <div class="create-new-material">
    <div class="header controls-row">
      <h5 class="title">Create new material</h5>
      <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs close-btn" />
    </div>

    <input-text placeholder="Material name" :onInput="onInputName" :value="materialName" />
    <checkbox-btn sufix="Vertex shader" :checked="checkboxState" :onChange="onChangeCheckBox" />

    <div class="footer controls-row">
      <custom-btn title="Create" :onClick="onCreateNewMaterial" class="success" />
    </div>
  </div>
</template>

<script>
import { noop } from '../../common/utils/base-helper';
import InputText from '../../common/components/input-text/InputText.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import './styles/create-new-material.scss';

export default {
  name: 'CreateNewMaterial',
  props: {
    onClose: { type: Function, default: noop }
  },
  components: {
    CheckboxBtn,
    CustomBtn,
    InputText
  },
  data() {
    return {
      materialName: '',
      checkboxState: true
    }
  },
  methods: {
    onCreateNewMaterial() {
      console.log(this.materialName, this.checkboxState);
    },
    onChangeCheckBox(state) {
      this.checkboxState = state;
    },
    onInputName(text) {
      this.materialName = text;
    }
  }
}
</script>

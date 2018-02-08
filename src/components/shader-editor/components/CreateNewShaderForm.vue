<script>
import noop from '../../../common/utils/noop';
import InputText from '../../../common/components/input-text/InputText.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'CreateNewShaderForm',
  props: {
    isVisibleCloseBtn: { type: Boolean, default: false },
    onBack: { type: Function, default: noop },
    onClose: { type: Function, default: noop },
    onCreate: { type: Function, default: noop },
    onOpenShaderLibrary: { type: Function, default: noop },
  },
  components: {
    CheckboxBtn,
    CustomBtn,
    InputText
  },
  data() {
    return {
      shaderName: '',
      checkboxState: true,
    }
  },
  methods: {
    onCreateNewShader() {
      console.log(this.shaderName, this.checkboxState);
      this.onCreate(this.shaderName, this.checkboxState);
    },
    onChangeCheckBox(state) {
      this.checkboxState = state;
    },
    onInputShaderName(text) {
      this.shaderName = text;
    }
  }
}
</script>

<template>
  <div class="create-new-shader-form">
    <div class="header">
      <custom-btn v-if="!isVisibleCloseBtn" iconClass="icon-arrow-left" :onClick="onBack" class="xs back-btn" />
      <h4 class="title">Create new shader</h4>
      <custom-btn v-if="isVisibleCloseBtn" iconClass="icon-close" :onClick="onClose" class="danger xs" />
    </div>

    <input-text placeholder="Shader name" :onInput="onInputShaderName" :value="shaderName" />
    <checkbox-btn sufix="Vertex shader" :checked="checkboxState" :onChange="onChangeCheckBox" />

    <div class="buttons-row">
      <custom-btn title="Create" :onClick="onCreateNewShader" class="success" />
      <custom-btn iconClass="icon-gallery" title="Shader library" v-if="!isVisibleCloseBtn" :onClick="onOpenShaderLibrary" class="secondary" />
    </div>
  </div>
</template>

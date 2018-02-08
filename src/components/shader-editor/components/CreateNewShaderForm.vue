<script>
import noop from '../../../common/utils/noop';
import InputText from '../../../common/components/input-text/InputText.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../../common/components/checkbox-btn/CheckboxBtn.vue';

export default {
  name: 'CreateNewShaderForm',
  props: {
    onBack: { type: Function, default: noop },
    onClose: { type: Function, default: noop },
    onCreate: { type: Function, default: noop },
    onOpenShadersGallery: { type: Function, default: noop },
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
      <custom-btn iconClass="icon-arrow-left" :onClick="onBack" class="xs back-btn" />
      <h3 class="title">Create new shader</h3>
      <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs close-btn" />
    </div>

    <div class="body">
      <div class="input-controls-row">
        <input-text placeholder="Shader name" :onInput="onInputShaderName" :value="shaderName" />
        <checkbox-btn sufix="Vertex shader" :checked="checkboxState" :onChange="onChangeCheckBox" />
      </div>

      <div class="buttons-row">
        <custom-btn iconClass="icon-gallery" title="Shaders gallery" :onClick="onOpenShadersGallery" class="secondary shaders-gallery" />
        <custom-btn title="Create" :onClick="onCreateNewShader" class="success" />
      </div>
    </div>
  </div>
</template>

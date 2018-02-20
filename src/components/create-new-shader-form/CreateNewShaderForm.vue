<script>
import noop from '../../common/utils/noop';
import InputText from '../../common/components/input-text/InputText.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import './styles/create-new-shader-form.scss';

export default {
  name: 'CreateNewShaderForm',
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
      shaderName: '',
      checkboxState: true
    }
  },
  methods: {
    onCreateNewShader() {
      console.log(this.shaderName, this.checkboxState);
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
    <div class="header controls-row">
      <h5 class="title">Create new shader</h5>
      <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs close-btn" />
    </div>

    <input-text placeholder="Shader name" :onInput="onInputShaderName" :value="shaderName" />
    <checkbox-btn sufix="Vertex shader" :checked="checkboxState" :onChange="onChangeCheckBox" />

    <div class="footer controls-row">
      <custom-btn title="Create" :onClick="onCreateNewShader" class="success" />
    </div>
  </div>
</template>

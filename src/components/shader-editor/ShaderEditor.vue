<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';

import shadersTypes from '../../common/constants/shaders-types';

export default {
  name: 'ShaderEditor',
  components: {
    ShaderControls,
    ResizeBox,
    CodeEditor,
    CustomBtn,
    InputFile
  },
  data() {
    return {
      shadersTypes
    };
  },
  computed: mapState([
    'shaders',
    'controls',
    'shadersInfo',
    'activeShaderType',
    'activeControlsType',
    'isVisibleControlsFooter',
    'controlsFooterHeight',
    'controlsPanelWidth'
  ]),
  methods: {
    ...mapActions([
      'onChangeCodeEditor',
      'onSetPanelControlsWidth',
      'onSetActiveShaderType',
      'onToggleFooterControls',
      'onSetActiveControlsType',
      'onSetFooterControlsHeight'
    ]),
    onSaveShader(payload) {
      console.log(payload);
    }
  }
};
</script>

<template>
  <resize-box
    tag="section"
    resize="column"
    class="container controls-section"
    :onEndOfResize="onSetPanelControlsWidth"
    :size="controlsPanelWidth"
  >
    <header class="header controls-row">
      <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
      <custom-btn
        title="Fragment"
        iconClass="icon-fragment"
        :active="activeShaderType === shadersTypes.FRAGMENT_SHADER"
        :data="shadersTypes.FRAGMENT_SHADER"
        :onClick="onSetActiveShaderType"
      />
      <custom-btn
        title="Vertex"
        iconClass="icon-vertex"
        :active="activeShaderType === shadersTypes.VERTEX_SHADER"
        :data="shadersTypes.VERTEX_SHADER" :onClick="onSetActiveShaderType"
      />
      <custom-btn iconClass="icon-undo" class="xs" />
      <custom-btn iconClass="icon-save" class="xs" />
      <custom-btn iconClass="icon-redo" class="xs" />
      <custom-btn iconClass="icon-new-file" class="xs" :onClick="onOpenCreateNewMaterial" />
      <custom-btn iconClass="icon-open-folder" class="xs" />
    </header>

    <section class="body">
      <code-editor
        :activeShader="activeShaderType"
        :shaders="shaders"
        :onChange="onChangeCodeEditor"
        :onSave="onSaveShader"
      />
    </section>

    <shader-controls
      :onSetFooterControlsHeight="onSetFooterControlsHeight"
      :onSetActiveControlsType="onSetActiveControlsType"
      :onToggleFooterControls="onToggleFooterControls"
      :isVisibleControlsFooter="isVisibleControlsFooter"
      :controlsFooterHeight="controlsFooterHeight"
      :activeControlsType="activeControlsType"
    />
  </resize-box>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import CreateNewMaterial from '../create-new-material/CreateNewMaterial.vue';

import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';
import Gallery from '../gallery/Gallery.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';

import * as internalUrls from '../../common/constants/internal-urls';
import shadersTypes from '../../common/constants/shaders-types';

export default {
  name: 'ShaderEditor',
  components: {
    CodeEditor,
    ModalWindow,
    CustomBtn,
    InputFile,
    ResizeBox,
    CanvasSection,
    Gallery,
    ShaderControls,
    CreateNewMaterial
  },
  data() {
    return {
      shadersTypes,
      isOpenCreateNewMaterial: false,
      internalUrls
    };
  },
  computed: mapState([
    'shaders',
    'controls',
    'shadersInfo',
    'activeShaderType',
    'activeControlsType',
    'isVisibleControlsPanel',
    'isVisibleControlsFooter',
    'controlsFooterHeight',
    'controlsPanelWidth'
  ]),
  methods: {
    ...mapActions([
      'onChangeCodeEditor',
      'onSetPanelControlsWidth',
      'onToggleFullScreenMode',
      'onSetActiveShaderType',
      'onToggleFooterControls',
      'onSetActiveControlsType',
      'onSetFooterControlsHeight'
    ]),
    onSaveShader(payload) {
      console.log(payload);
    },
    onOpenCreateNewMaterial() {
      this.isOpenCreateNewMaterial = !this.isOpenCreateNewMaterial;
    },
    onCloseCreateNewMaterial() {
      if (this.isOpenCreateNewMaterial) {
        this.isOpenCreateNewMaterial = false;
      }
    }
  }
};
</script>

<template>
  <div class="base-layout">
    <modal-window :isOpen="isOpenCreateNewMaterial">
      <create-new-material :onClose="onCloseCreateNewMaterial" />
    </modal-window>

    <resize-box
      class="container controls-section"
      v-show="isVisibleControlsPanel"
      tag="section" resize="column"
      :onEndOfResize="onSetPanelControlsWidth"
      :size="controlsPanelWidth"
    >
      <header class="header controls-row">
        <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
        <custom-btn
          title="Fragment" iconClass="icon-fragment"
          :active="activeShaderType === shadersTypes.FRAGMENT_SHADER"
          :data="shadersTypes.FRAGMENT_SHADER"
          :onClick="onSetActiveShaderType"
        />
        <custom-btn
          title="Vertex" iconClass="icon-vertex"
          :active="activeShaderType === shadersTypes.VERTEX_SHADER"
          :data="shadersTypes.VERTEX_SHADER" :onClick="onSetActiveShaderType"
        />
        <custom-btn iconClass="icon-undo" class="xs" />
        <custom-btn iconClass="icon-save" class="xs" />
        <custom-btn iconClass="icon-redo" class="xs" />
        <custom-btn iconClass="icon-new-file" class="xs" :onClick="onOpenCreateNewMaterial" />
        <custom-btn iconClass="icon-open-folder" class="xs" />
        <custom-btn :link="internalUrls.MATERIAL_EDITOR" accesskey="w" iconClass="icon-material-editor" class="xs" />
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

    <canvas-section :isFullScreenMode="!isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
      </div>
    </canvas-section>
  </div>
</template>

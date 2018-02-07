<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import GeometricObjects from '../geometric-objects/GeometricObjects.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';
import GlslPrograms from '../glsl-programs/GlslPrograms.vue';

import * as internalUrls from '../../common/constants/internal-urls';
import shadersTypes from '../../common/constants/shaders-types';

export default {
  name: 'ShaderEditor',
  components: {
    CodeEditor,
    ModalWindow,
    CustomBtn,
    GeometricObjects,
    InputFile,
    CanvasBoard,
    ResizeBox,
    GlslPrograms,
    ShaderControls,
    PresentationFooter
  },
  data() {
    return {
      shadersTypes,
      isOpenCreateNewFileForm: false,
      internalUrls
    };
  },
  computed: mapState([
    'shadersInfo',
    'shadersValues',
    'shadersControls',
    'isVisibleControlsPanel',
    'isVisibleObjectsList',
    'isVisibleControlsFooter',
    'activeControlsType',
    'activeShaderType',
    'isOpenGlslProgramsWindow',
    'controlsFooterHeight',
    'controlsPanelWidth',
    'newControls'
  ]),
  methods: {
    ...mapActions([
      'onChangeCodeEditor',
      'onSetPanelControlsWidth',
      'onToggleObjectsList',
      'onToggleFullScreenMode',
      'onSetActiveShaderType',
      'onToggleFooterControls',
      'onSetActiveControlsType',
      'onSetFooterControlsHeight'
    ]),

    onSaveShader(payload) {
      console.log(payload);
    },

    onOpenCreateNewFileForm() {
      this.isOpenCreateNewFileForm = !this.isOpenCreateNewFileForm;
    },

    onCloseCreateNewFileForm() {
      if (this.isOpenCreateNewFileForm) {
        this.isOpenCreateNewFileForm = false;
      }
    },
  }
};
</script>

<template>
  <div class="editor-container" v-if="!shadersInfo">
    <glsl-programs v-if="isOpenGlslProgramsWindow" />
    <button>back to material editor</button>
    <div class="create-new-shader-form">
      <h1>create new shader</h1>
      <input type="text">
    </div>
  </div>

  <div class="editor-container" v-else>
    <glsl-programs v-if="isOpenGlslProgramsWindow" />
    <modal-window :isOpen="isOpenCreateNewFileForm" :onClose="onCloseCreateNewFileForm" сloseByOverlayClick>
      <div class="create-new-shader-form">
        <h1>create new shader</h1>
        <input type="text">
      </div>
    </modal-window>

    <resize-box v-if="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetPanelControlsWidth" :size="controlsPanelWidth" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn v-if="!!shadersValues[shadersTypes.FRAGMENT_SHADER]" title="Fragment" iconClass="icon-fragment" :active="activeShaderType === shadersTypes.FRAGMENT_SHADER" :data="shadersTypes.FRAGMENT_SHADER" :onClick="onSetActiveShaderType" />
          <custom-btn v-if="!!shadersValues[shadersTypes.VERTEX_SHADER]" title="Vertex" iconClass="icon-vertex" :active="activeShaderType === shadersTypes.VERTEX_SHADER" :data="shadersTypes.VERTEX_SHADER" :onClick="onSetActiveShaderType" />
          <custom-btn iconClass="icon-undo" class="xs" />
          <custom-btn iconClass="icon-save" class="xs" />
          <custom-btn iconClass="icon-redo" class="xs" />
          <custom-btn iconClass="icon-new-file" class="xs" :onClick="onOpenCreateNewFileForm" />
          <custom-btn iconClass="icon-open-folder" class="xs" />
          <custom-btn iconClass="icon-gallery" class="xs" />
          <custom-btn :link="internalUrls.MATERIAL_EDITOR" accesskey="w" iconClass="icon-material-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <code-editor :activeShader="activeShaderType" :shaders="shadersValues" :onChange="onChangeCodeEditor" :onSave="onSaveShader" />
      </section>

      <shader-controls :onSetFooterControlsHeight="onSetFooterControlsHeight" :onSetActiveControlsType="onSetActiveControlsType" :onToggleFooterControls="onToggleFooterControls" :isVisibleControlsFooter="isVisibleControlsFooter" :controlsFooterHeight="controlsFooterHeight" :activeControlsType="activeControlsType" />
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
          <custom-btn iconClass="icon-sphere" />
          <custom-btn iconClass="icon-cube" />
          <custom-btn iconClass="icon-cylinder" />
          <custom-btn iconClass="icon-torus" />
          <custom-btn iconClass="icon-plane" />
          <input-file name="file1" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <geometric-objects v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box"></div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>
  </div>
</template>

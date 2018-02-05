<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import GeometricObjectsList from '../geometric-objects-list/GeometricObjectsList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';

import * as internalUrls from '../../common/constants/internal-urls';
import shadersControlsTypes from '../../common/constants/shaders-controls-types';

export default {
  name: 'ShaderEditor',
  components: {
    CodeEditor,
    ModalWindow,
    CustomBtn,
    GeometricObjectsList,
    InputFile,
    CanvasBoard,
    ResizeBox,
    ShaderControls,
    PresentationFooter
  },
  data() {
    return {
      shadersControlsTypes,
      isOpenCreateNewFileForm: false,
      internalUrls
    };
  },
  computed: mapState([
    'shaders',
    'isVisibleControlsPanel',
    'isVisibleObjectsList',
    'isVisibleControlsFooter',
    'activeControlsType',
    'activeShaderType',
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
  <div class="editor-container">
    <modal-window :isOpen="isOpenCreateNewFileForm" :onClose="onCloseCreateNewFileForm" сloseByOverlayClick />

    <resize-box v-if="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetPanelControlsWidth" :size="controlsPanelWidth" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn title="Fragment" iconClass="icon-fragment" :active="activeShaderType === shadersControlsTypes.FRAGMENT_SHADER" :data="shadersControlsTypes.FRAGMENT_SHADER" :onClick="onSetActiveShaderType" />
          <custom-btn title="Vertex" iconClass="icon-vertex" :active="activeShaderType === shadersControlsTypes.VERTEX_SHADER" :data="shadersControlsTypes.VERTEX_SHADER" :onClick="onSetActiveShaderType" />
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
        <code-editor :activeShader="activeShaderType" :shaders="shaders" :onChange="onChangeCodeEditor" :onSave="onSaveShader" />
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
          <geometric-objects-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box"></div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditor');

import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';

import CreateNewShaderForm from './components/CreateNewShaderForm.vue';

import GeometricObjects from '../geometric-objects/GeometricObjects.vue';
import ShaderControls from '../shader-controls/ShaderControls.vue';
import CodeEditor from '../code-editor/CodeEditor.vue';
import ShadersGallery from '../shaders-gallery/ShadersGallery.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';

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
    ResizeBox,
    CanvasSection,
    ShadersGallery,
    ShaderControls,
    CreateNewShaderForm
  },
  data() {
    return {
      shadersTypes,
      isOpenShadersGalleryWindow: false,
      isOpenCreateNewShaderForm: false,
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

    onCreateNewShader(shaderName, isVertexShader) {
      console.log(shaderName, isVertexShader);
    },

    onSaveShader(payload) {
      console.log(payload);
    },

    onOpenShadersGalleryWindow() {
      this.isOpenShadersGalleryWindow = !this.isOpenShadersGalleryWindow;
    },

    onCloseShadersGalleryWindow() {
      if (this.isOpenShadersGalleryWindow) {
        this.isOpenShadersGalleryWindow = false;
      }
    },

    onOpenCreateNewShaderForm() {
      this.isOpenCreateNewShaderForm = !this.isOpenCreateNewShaderForm;
    },

    onCloseCreateNewShaderForm() {
      if (this.isOpenCreateNewShaderForm) {
        this.isOpenCreateNewShaderForm = false;
      }
    }
  }
};
</script>

<template>
  <div class="create-new-shader-container" v-if="!shadersInfo">
    <shaders-gallery :isOpen="isOpenShadersGalleryWindow" :onClose="onCloseShadersGalleryWindow" />
    <create-new-shader-form :onCreate="onCreateNewShader" :onOpenShadersGallery="onOpenShadersGalleryWindow" />
  </div>

  <div class="base-layout" v-else>
    <shaders-gallery :isOpen="isOpenShadersGalleryWindow" :onClose="onCloseShadersGalleryWindow" isEditable />
    <modal-window :isOpen="isOpenCreateNewShaderForm">
      <create-new-shader-form class="is-in-modal-window" :onClose="onCloseCreateNewShaderForm" :onCreate="onCreateNewShader" isEditable />
    </modal-window>

    <resize-box class="container controls-section" v-if="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetPanelControlsWidth" :size="controlsPanelWidth">
      <header class="header controls-row">
        <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
        <custom-btn v-if="!!shadersValues[shadersTypes.FRAGMENT_SHADER]" title="Fragment" iconClass="icon-fragment" :active="activeShaderType === shadersTypes.FRAGMENT_SHADER" :data="shadersTypes.FRAGMENT_SHADER" :onClick="onSetActiveShaderType" />
        <custom-btn v-if="!!shadersValues[shadersTypes.VERTEX_SHADER]" title="Vertex" iconClass="icon-vertex" :active="activeShaderType === shadersTypes.VERTEX_SHADER" :data="shadersTypes.VERTEX_SHADER" :onClick="onSetActiveShaderType" />
        <custom-btn iconClass="icon-undo" class="xs" />
        <custom-btn iconClass="icon-save" class="xs" />
        <custom-btn iconClass="icon-redo" class="xs" />
        <custom-btn iconClass="icon-new-file" class="xs" :onClick="onOpenCreateNewShaderForm" />
        <custom-btn iconClass="icon-open-folder" class="xs" />
        <custom-btn iconClass="icon-gallery" class="xs" :onClick="onOpenShadersGalleryWindow" />
        <custom-btn :link="internalUrls.MATERIAL_EDITOR" accesskey="w" iconClass="icon-material-editor" class="xs" />
      </header>

      <section class="body">
        <code-editor :activeShader="activeShaderType" :shaders="shadersValues" :onChange="onChangeCodeEditor" :onSave="onSaveShader" />
      </section>

      <shader-controls :onSetFooterControlsHeight="onSetFooterControlsHeight" :onSetActiveControlsType="onSetActiveControlsType" :onToggleFooterControls="onToggleFooterControls" :isVisibleControlsFooter="isVisibleControlsFooter" :controlsFooterHeight="controlsFooterHeight" :activeControlsType="activeControlsType" />
    </resize-box>

    <canvas-section :isInFullScreenMode="isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <geometric-objects v-if="isVisibleObjectsList" />
      </transition>
    </canvas-section>
  </div>
</template>

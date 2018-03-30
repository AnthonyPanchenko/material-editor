<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('playground');

import geometryTypes from '../../common/constants/basic-geometry-types';
import transformationsModes from '../../common/constants/transformations-modes';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';

import Gallery from '../gallery/Gallery.vue';
import MeshesList from '../meshes-list/MeshesList.vue';
import ShaderEditor from '../shader-editor/ShaderEditor.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import MaterialEditor from '../material-editor/MaterialEditor.vue';
import CreateNewMaterial from '../create-new-material/CreateNewMaterial.vue';

export default {
  name: 'Playground',
  components: {
    CreateNewMaterial,
    MaterialEditor,
    CanvasSection,
    ShaderEditor,
    ModalWindow,
    MeshesList,
    InputFile,
    CustomBtn,
    Gallery,
    ResizeBox
  },
  data() {
    return {
      transformationsModes,
      geometryTypes
    };
  },
  computed: mapState([
    'isOpenCreateNewMaterialForm',
    'isVisibleControlsPanel',
    'isVisibleMeshesList',
    'transformationMode',
    'geometryToScene'
  ]),
  methods: {
    ...mapActions([
      'onToggleCreateNewMaterialForm',
      'onToggleMeshesList',
      'onToggleFullScreenMode',
      'onSetTransformationMode',
      'onAddGeometryToScene'
    ]),
    onChangeSelect(selectedValue, name) {
      console.log(selectedValue);
      console.log(name);
    },
    onChangeFileInput(file) {
      console.log(file);
    },
    onChangeCheckBox(state, value, name) {
      console.log(state);
      console.log(value);
      console.log(name);
    }
  }
};
</script>

<template>
  <div class="base-layout">
    <modal-window :isOpen="isOpenCreateNewMaterialForm">
      <create-new-material :onClose="onToggleCreateNewMaterialForm" />
    </modal-window>

    <material-editor v-if="isVisibleControlsPanel" :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm" />
    <shader-editor v-if="!true" :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm" />

    <canvas-section
      :geometryToScene="geometryToScene"
      :transformationMode="transformationMode"
      :isFullScreenMode="!isVisibleControlsPanel"
      :onToggleFullScreenMode="onToggleFullScreenMode"
    >
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleMeshesList" />
        <custom-btn iconClass="icon-move" class="xs" accesskey="w" :data="transformationsModes.TRANSLATE" :onClick="onSetTransformationMode" />
        <custom-btn iconClass="icon-rotate" class="xs" accesskey="e" :data="transformationsModes.ROTATE" :onClick="onSetTransformationMode" />
        <custom-btn iconClass="icon-scale" class="xs" accesskey="r" :data="transformationsModes.SCALE" :onClick="onSetTransformationMode" />
        <custom-btn iconClass="icon-sphere" :data="geometryTypes.SPHERE" :onClick="onAddGeometryToScene" />
        <custom-btn iconClass="icon-cube" :data="geometryTypes.CUBE" :onClick="onAddGeometryToScene" />
        <custom-btn iconClass="icon-cylinder" :data="geometryTypes.CYLINDER" :onClick="onAddGeometryToScene" />
        <custom-btn iconClass="icon-torus" :data="geometryTypes.TORUS" :onClick="onAddGeometryToScene" />
        <custom-btn iconClass="icon-plane" :data="geometryTypes.PLANE" :onClick="onAddGeometryToScene" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <meshes-list v-show="isVisibleMeshesList" />
      </transition>
    </canvas-section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('playground');

import objectTypes from '../../common/constants/object-types';
import editorsNames from '../../common/constants/editors-names';
import transformationsModes from '../../common/constants/transformations-modes';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';

import Gallery from '../gallery/Gallery.vue';
import MeshesList from '../meshes-list/MeshesList.vue';
import ShaderEditor from '../shader-editor/ShaderEditor.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import LightingEditor from '../lighting-editor/LightingEditor.vue';
import ParticlesEditor from '../particles-editor/ParticlesEditor.vue';
import MaterialEditor from '../material-editor/MaterialEditor.vue';

export default {
  name: 'Playground',
  components: {
    ModalWindow,
    ParticlesEditor,
    MaterialEditor,
    LightingEditor,
    CanvasSection,
    ShaderEditor,
    MeshesList,
    InputFile,
    CustomBtn,
    Gallery,
    ResizeBox
  },
  data() {
    return {
      editorsNames,
      objectTypes,
      transformationsModes
    };
  },
  computed: mapState([
    'objects',
    'materials',
    'geometries',
    'objectToScene',
    'currentEditableIds',
    'transformationMode',
    'isVisibleMeshesList',
    'currentVisibleEditor',
    'isOpenGallery'
  ]),
  methods: {
    ...mapActions([
      'onToggleMeshesList',
      'onAddObjectToScene',
      'onOpenShaderEditor',
      'onOpenMaterialEditor',
      'onOpenLightingEditor',
      'onOpenParticlesEditor',
      'onSetTransformationMode',
      'onToggleOpenGallery'
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
    <modal-window сloseByOverlayClick v-if="isOpenGallery" isDraggable isResizable :onOverlayClose="onToggleOpenGallery">
      <gallery :onClose="onToggleOpenGallery" />
    </modal-window>

    <material-editor
      :onOpenShaderEditor="onOpenShaderEditor"
      :onToggleOpenGallery="onToggleOpenGallery"
      :currentObject="objects[currentEditableIds.objectId] || {}"
      :currentMaterial="materials[currentEditableIds.materialId] || {}"
      :currentGeometry="geometries[currentEditableIds.geometryId] || {}"
      v-if="currentVisibleEditor === editorsNames.MATERIAL_EDITOR"
    />

    <shader-editor
      :onOpenMaterialEditor="onOpenMaterialEditor"
      v-if="currentVisibleEditor === editorsNames.SHADER_EDITOR"
    />

    <lighting-editor
      :onOpenLightingEditor="onOpenLightingEditor"
      v-if="currentVisibleEditor === editorsNames.LIGHTING_EDITOR"
    />

    <particles-editor
      :onOpenParticlesEditor="onOpenParticlesEditor"
      v-if="currentVisibleEditor === editorsNames.PARTICLES_EDITOR"
    />

    <canvas-section
      :objects="objects"
      :materials="materials"
      :geometrys="geometries"
      :objectToScene="objectToScene"
      :transformationMode="transformationMode"
      :currentEditableIds="currentEditableIds"
    >
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleMeshesList" />

        <custom-btn
          class="xs"
          accesskey="w"
          iconClass="icon-move"
          :active="transformationMode === transformationsModes.TRANSLATE"
          :data="transformationsModes.TRANSLATE"
          :onClick="onSetTransformationMode"
        />

        <custom-btn
          class="xs"
          accesskey="e"
          iconClass="icon-rotate"
          :active="transformationMode === transformationsModes.ROTATE"
          :data="transformationsModes.ROTATE"
          :onClick="onSetTransformationMode"
        />

        <custom-btn
          class="xs"
          accesskey="r"
          iconClass="icon-scale"
          :active="transformationMode === transformationsModes.SCALE"
          :data="transformationsModes.SCALE"
          :onClick="onSetTransformationMode"
        />

        <custom-btn iconClass="icon-emitter" :data="objectTypes.PARTICLES_EMITTER" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-bulb-on" :data="objectTypes.LIGHT" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-sphere" :data="objectTypes.SPHERE" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-cube" :data="objectTypes.CUBE" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-cylinder" :data="objectTypes.CYLINDER" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-torus" :data="objectTypes.TORUS" :onClick="onAddObjectToScene" />
        <custom-btn iconClass="icon-plane" :data="objectTypes.PLANE" :onClick="onAddObjectToScene" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <meshes-list v-show="isVisibleMeshesList" />
      </transition>
    </canvas-section>
  </div>
</template>

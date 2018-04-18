<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('playground');

import BaseScene from '../../common/utils/BaseScene';
import { getGeometryByType, getLightingByType, getLightingHelperByType } from '../../common/utils/base-scene-helper';

import geometryTypes from '../../common/constants/geometry-types';
import objectTypes from '../../common/constants/object-types';
import editorsNames from '../../common/constants/editors-names';
import transformationsModes from '../../common/constants/transformations-modes';

import { selectOptions } from '../../common/constants/lighting-types';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';

import Gallery from '../gallery/Gallery.vue';
import MeshesList from '../meshes-list/MeshesList.vue';
import ShaderEditor from '../shader-editor/ShaderEditor.vue';
import LightingEditor from '../lighting-editor/LightingEditor.vue';
import ParticlesEditor from '../particles-editor/ParticlesEditor.vue';
import MaterialEditor from '../material-editor/MaterialEditor.vue';

export default {
  name: 'Playground',
  components: {
    ModalWindow,
    CustomSelect,
    ParticlesEditor,
    MaterialEditor,
    LightingEditor,
    ShaderEditor,
    MeshesList,
    InputFile,
    CustomBtn,
    Gallery,
    ResizeBox
  },
  data() {
    return {
      baseScene: {},
      selectOptions,
      editorsNames,
      objectTypes,
      geometryTypes,
      transformationsModes
    };
  },
  computed: mapState([
    'objects',
    'materials',
    'geometries',
    'currentEditableIds',
    'transformationMode',
    'isVisibleMeshesList',
    'currentVisibleEditor',
    'isOpenGallery'
  ]),
  methods: {
    ...mapActions([
      'onToggleMeshesList',
      'onOpenShaderEditor',
      'onOpenMaterialEditor',
      'onOpenLightingEditor',
      'onSetTransformationMode',
      'onOpenParticlesEditor',
      'onToggleOpenGallery'
    ]),
    setTransformationMode(mode) {
      this.onSetTransformationMode(mode);
      this.baseScene.controls.transformControls.setMode(mode);
    },
    addParticlesEmitterToScene() {
      console.log('addParticlesEmitterToScene');
    },
    addGeometryToScene(type) {
      const geometry = getGeometryByType(type);
      if (geometry) {
        this.baseScene.addMesh(geometry);
      }
    },
    removeMeshByUuid(uuid) {
      this.baseScene.removeMesh(uuid);
    },
    selectMeshInSceneCallback(mesh) {
      console.log(mesh);
      // mesh.material.wireframe = true;
    },
    deselectMeshInSceneCallback() {
      console.log('deselectMesh');
    },
    addCustomMeshToScene() {
      // const geometry = null;
      // const json = this.baseScene.addMesh(geometry);
    },
    addLightingToScene(val) {
      const lighting = getLightingByType(val.id);
      if (lighting) {
        this.baseScene.addLighting(lighting, getLightingHelperByType(val.id, lighting));
      }
    }
  },
  mounted() {
    const canvasBox = this.$refs.canvasBox;

    this.baseScene = new BaseScene(
      canvasBox.clientWidth,
      canvasBox.clientHeight,
      this.selectMeshInSceneCallback,
      this.deselectMeshInSceneCallback
    );

    this.baseScene.init(canvasBox);
  },
  beforeDestroy() {
    this.baseScene.removeEventListeners();
  }
};
</script>

<template>
  <div class="base-layout">
    <modal-window v-if="isOpenGallery" isResizable :onOverlayClose="onToggleOpenGallery">
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

    <section class="container canvas-section">
      <div class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleMeshesList" />

        <custom-btn
          class="xs"
          accesskey="w"
          iconClass="icon-move"
          :active="transformationMode === transformationsModes.TRANSLATE"
          :data="transformationsModes.TRANSLATE"
          :onClick="setTransformationMode"
        />

        <custom-btn
          class="xs"
          accesskey="e"
          iconClass="icon-rotate"
          :active="transformationMode === transformationsModes.ROTATE"
          :data="transformationsModes.ROTATE"
          :onClick="setTransformationMode"
        />

        <custom-btn
          class="xs"
          accesskey="r"
          iconClass="icon-scale"
          :active="transformationMode === transformationsModes.SCALE"
          :data="transformationsModes.SCALE"
          :onClick="setTransformationMode"
        />

        <custom-select isDropDownBtn :options="selectOptions" :onChange="addLightingToScene" class="xs">
          <span class="dropdown-btn">
            <i class="icon-bulb-on" />
            <i class="icon-triangle-down" />
          </span>
        </custom-select>

        <custom-btn iconClass="icon-emitter" :onClick="addParticlesEmitterToScene" />
        <custom-btn iconClass="icon-sphere" :data="geometryTypes.SPHERE" :onClick="addGeometryToScene" />
        <custom-btn iconClass="icon-cube" :data="geometryTypes.BOX" :onClick="addGeometryToScene" />
        <custom-btn iconClass="icon-cylinder" :data="geometryTypes.CYLINDER" :onClick="addGeometryToScene" />
        <custom-btn iconClass="icon-torus" :data="geometryTypes.TORUS" :onClick="addGeometryToScene" />
        <custom-btn iconClass="icon-plane" :data="geometryTypes.PLANE" :onClick="addGeometryToScene" />
        <input-file name="file1" />
      </div>

      <div class="body">
        <transition slot="sidebar" name="slide-meshes-list">
          <meshes-list v-show="isVisibleMeshesList" />
        </transition>
        <div ref="canvasBox" class="canvas-box" />
      </div>

      <div class="footer controls-row">
        <span class="label fps">FPS 60</span>
      </div>
    </section>
  </div>
</template>

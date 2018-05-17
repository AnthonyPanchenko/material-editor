<template>
  <div class="base-layout">
    <modal-window v-if="isOpenGallery" isResizable :onOverlayClose="onToggleOpenGallery">
      <gallery :onClose="onToggleOpenGallery" />
    </modal-window>

    <ogm-editor
      :activeEditorName="activeEditorName"
      :onChangeObjectProperty="onChangeObjectProperty"
      :onChangeGeometryProperty="onChangeGeometryProperty"
      :onChangeMaterialProperty="onChangeMaterialProperty"
      :onSetActiveEditorName="onSetActiveEditorName"
      :onSetNewObjectName="onSetNewObjectName"
      :onSetNewGeometryName="onSetNewGeometryName"
      :onSetNewMaterialName="onSetNewMaterialName"
      :onToggleOpenGallery="onToggleOpenGallery"
      :activeObject="objects[activeEditableIds.objectId] || {}"
      :activeMaterial="materials[activeEditableIds.materialId] || {}"
      :activeGeometry="geometries[activeEditableIds.geometryId] || {}"
      v-if="activeEditorName === editorsNames.OBJECT_EDITOR || activeEditorName === editorsNames.GEOMETRY_EDITOR || activeEditorName === editorsNames.MATERIAL_EDITOR"
    />

    <shader-editor
      :onChange="onChangeMaterialProperty"
      :onSetActiveEditorName="onSetActiveEditorName"
      v-if="activeEditorName === editorsNames.SHADER_EDITOR"
    />

    <lighting-editor
      :onChange="onChangeObjectProperty"
      :onSetActiveEditorName="onSetActiveEditorName"
      v-if="activeEditorName === editorsNames.LIGHTING_EDITOR"
    />

    <particles-editor
      :onSetActiveEditorName="onSetActiveEditorName"
      v-if="activeEditorName === editorsNames.PARTICLES_EDITOR"
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
        <transition slot="sidebar" name="slide-objects-list">
          <objects-list
            :list="objectsList"
            :onSelect="onSelectMeshByUuid"
            :onRemove="onRemoveMeshByUuid"
            v-show="isVisibleMeshesList"
          />
        </transition>
        <div ref="canvasBox" class="canvas-box" />
      </div>

      <div class="footer controls-row">
        <span class="label fps">FPS 60</span>
      </div>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('playground');

import BaseScene from '../../common/utils/BaseScene';
import { getGeometryByType, getLightingByType, getLightingHelperByType } from '../../common/utils/base-scene-helper';

import geometryTypes from '../../common/constants/geometry-types';
import objectTypes from '../../common/constants/object-types';
import editorsNames from '../../common/constants/editors-names';
import transformationsModes from '../../common/constants/transformations-modes';

import lightingTypes from '../../common/constants/lighting-types';
import { createSelectOptions } from '../../common/utils/base-helper';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';
import ModalWindow from '../../common/components/modal-window/ModalWindow.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';

import Gallery from '../gallery/Gallery.vue';
import ObjectsList from '../objects-list/ObjectsList.vue';
import ShaderEditor from '../shader-editor/ShaderEditor.vue';
import LightingEditor from '../lighting-editor/LightingEditor.vue';
import ParticlesEditor from '../particles-editor/ParticlesEditor.vue';
import OgmEditor from '../ogm-editor/OGMeditor.vue';

export default {
  name: 'Playground',
  components: {
    OgmEditor,
    ModalWindow,
    CustomSelect,
    ParticlesEditor,
    LightingEditor,
    ShaderEditor,
    ObjectsList,
    InputFile,
    CustomBtn,
    Gallery,
    ResizeBox
  },
  data() {
    return {
      baseScene: {},
      activeObject: {
        geometry: {},
        material: {}
      },
      selectOptions: createSelectOptions(lightingTypes),
      editorsNames,
      objectTypes,
      geometryTypes,
      transformationsModes
    };
  },
  computed: {
    ...mapState([
      'objects',
      'materials',
      'geometries',
      'activeEditableIds',
      'transformationMode',
      'isVisibleMeshesList',
      'activeEditorName',
      'isOpenGallery'
    ]),
    objectsList() {
      return Object.keys(this.objects)
        .map(objId => ({ id: objId, name: this.objects[objId].name }))
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
    }
  },
  methods: {
    ...mapActions([
      'onToggleMeshesList',
      'onSetObjectPropertyValue',
      'onSetGeometryPropertyValue',
      'onSetMaterialPropertyValue',
      'onSetActiveEditorName',
      'onSetTransformationMode',
      'onToggleOpenGallery'
    ]),
    setTransformationMode(mode) {
      this.onSetTransformationMode(mode);
      this.baseScene.controls.transformControls.setMode(mode);
    },
    addParticlesEmitterToScene() {
      console.log('addParticlesEmitterToScene');
    },
    onSetNewObjectName() {
      console.log('onSetNewObjectName');
    },
    onSetNewGeometryName() {
      console.log('onSetNewGeometryName');
    },
    onSetNewMaterialName() {
      console.log('onSetNewMaterialName');
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
      this.activeObject = mesh.object;

      console.log(mesh.object);
      // console.log(mesh.object.toJSON());
    },
    deselectMeshInSceneCallback() {
      this.activeObject = {};
    },
    onChangeObjectProperty(payload) {
      this.onSetObjectPropertyValue(payload);
      this.activeObject[payload.fieldName] = payload.value;
    },
    onChangeGeometryProperty(payload) {
      this.onSetGeometryPropertyValue(payload);
      this.activeObject.geometry[payload.fieldName] = payload.value;
    },
    onChangeMaterialProperty(payload) {
      this.onSetMaterialPropertyValue(payload);
      this.activeObject.material[payload.fieldName] = payload.value;
    },
    onSelectMeshByUuid(uuid) {
      console.log(uuid);
    },
    onRemoveMeshByUuid(uuid) {
      console.log(uuid);
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

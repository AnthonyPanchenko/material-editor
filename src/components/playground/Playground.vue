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
import CreateNewMaterial from '../create-new-material/CreateNewMaterial.vue';

export default {
  name: 'Playground',
  components: {
    CreateNewMaterial,
    ParticlesEditor,
    MaterialEditor,
    LightingEditor,
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
      editorsNames,
      objectTypes,
      transformationsModes
    };
  },
  computed: mapState([
    'objectToScene',
    'transformationMode',
    'isVisibleMeshesList',
    'currentVisibleEditor',
    'currentEditableObject',
    'isVisibleControlsPanel',
    'isOpenCreateNewMaterialForm'
  ]),
  methods: {
    ...mapActions([
      'onToggleMeshesList',
      'onAddObjectToScene',
      'onToggleFullScreenMode',
      'onSetTransformationMode',
      'onToggleCreateNewMaterialForm'
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

    <material-editor
      v-if="currentVisibleEditor === editorsNames.MATERIAL_EDITOR"
      :currentEditableObject="currentEditableObject"
      :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm"
    />

    <shader-editor
      v-if="currentVisibleEditor === editorsNames.SHADER_EDITOR"
      :currentEditableObject="currentEditableObject"
      :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm"
    />

    <lighting-editor
      v-if="currentVisibleEditor === editorsNames.LIGHTING_EDITOR"
      :currentEditableObject="currentEditableObject"
      :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm"
    />

    <particles-editor
      v-if="currentVisibleEditor === editorsNames.PARTICLES_EDITOR"
      :currentEditableObject="currentEditableObject"
      :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm"
    />

    <canvas-section
      :objectToScene="objectToScene"
      :transformationMode="transformationMode"
      :isFullScreenMode="!isVisibleControlsPanel"
      :onToggleFullScreenMode="onToggleFullScreenMode"
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

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('playground');

import * as THREE from 'three';

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
    return {};
  },
  computed: mapState([
    'isOpenCreateNewMaterialForm',
    'isVisibleControlsPanel',
    'isVisibleMeshesList',
    'geometryToScene'
  ]),
  methods: {
    ...mapActions([
      'onToggleCreateNewMaterialForm',
      'onToggleMeshesList',
      'onToggleFullScreenMode',
      'addGeometryToScene'
    ]),

    onCreateSphere() {
      const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      this.addGeometryToScene(sphereGeometry);
    },

    onCreateCube() {
      const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      this.addGeometryToScene(cubeGeometry);
    },

    onCreateCylinder() {
      const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
      this.addGeometryToScene(cylinderGeometry);
    },

    onCreateTorus() {
      const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
      this.addGeometryToScene(torusGeometry);
    },

    onCreatePlane() {
      const planeGeometry = new THREE.PlaneGeometry(200, 200, 40, 40);
      this.addGeometryToScene(planeGeometry);
    },

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

    <material-editor v-show="isVisibleControlsPanel" :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm" />
    <shader-editor v-if="!true" :onToggleCreateNewMaterialForm="onToggleCreateNewMaterialForm" />

    <canvas-section :geometryToScene="geometryToScene" :isFullScreenMode="!isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleMeshesList" />
        <custom-btn iconClass="icon-move" class="xs" />
        <custom-btn iconClass="icon-rotate" class="xs" />
        <custom-btn iconClass="icon-scale" class="xs" />
        <custom-btn iconClass="icon-sphere" :onClick="onCreateSphere" />
        <custom-btn iconClass="icon-cube" :onClick="onCreateCube" />
        <custom-btn iconClass="icon-cylinder" :onClick="onCreateCylinder" />
        <custom-btn iconClass="icon-torus" :onClick="onCreateTorus" />
        <custom-btn iconClass="icon-plane" :onClick="onCreatePlane" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <meshes-list v-show="isVisibleMeshesList" />
      </transition>
    </canvas-section>
  </div>
</template>

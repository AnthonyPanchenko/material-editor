<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import tabNames from './constants/tabNames';
import * as internalUrls from '../../common/constants/internal-urls';

import Gallery from '../gallery/Gallery.vue';
import MeshesList from '../meshes-list/MeshesList.vue';
import ShaderEditor from '../shadere-ditor/ShaderEditor.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import MaterialEditor from '../material-editor/MaterialEditor.vue';

export default {
  name: 'Playground',
  components: {
    MaterialEditor,
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
      tabNames,
      internalUrls
    };
  },
  computed: mapState([
    'activeObjInfoTabName',
    'controlsPanelWidth',
    'activeMaterialType',
    'isVisibleControlsPanel',
    'isVisibleObjectsList'
  ]),
  methods: {
    ...mapActions([
      'onSetActiveObjInfoTabName',
      'onSetActiveMaterialType',
      'onSetControlsPanelWidth',
      'onToggleObjectsList',
      'onToggleFullScreenMode'
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
    <modal-window :isOpen="isOpenCreateNewMaterial">
      <create-new-material :onClose="onCloseCreateNewMaterial" />
    </modal-window>

    <material-editor v-if="true" />
    <shader-editor v-if="!true" />

    <canvas-section :isFullScreenMode="!isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
        <custom-btn iconClass="icon-move" class="xs" />
        <custom-btn iconClass="icon-rotate" class="xs" />
        <custom-btn iconClass="icon-scale" class="xs" />
        <div class="gap" />
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <meshes-list v-show="isVisibleObjectsList" />
      </transition>
    </canvas-section>
  </div>
</template>

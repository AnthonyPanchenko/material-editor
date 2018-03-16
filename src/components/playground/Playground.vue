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

import ObjectSection from '../object-section/ObjectSection.vue';
import MaterialSection from '../material-section/MaterialSection.vue';
import GeometrySection from '../geometry-section/GeometrySection.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';

export default {
  name: 'MaterialEditor',
  components: {
    MaterialSection,
    ObjectSection,
    GeometrySection,
    InputFile,
    CustomBtn,
    CanvasSection,
    MeshesList,
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
    <resize-box class="container controls-section" v-show="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetControlsPanelWidth" :size="controlsPanelWidth">
      <header class="header controls-row">
        <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
        <custom-btn accesskey="o" title="Object" :active="activeObjInfoTabName === tabNames.OBJECT" :data="tabNames.OBJECT" :onClick="onSetActiveObjInfoTabName" />
        <custom-btn accesskey="g" title="Geometry" :active="activeObjInfoTabName === tabNames.GEOMETRY" :data="tabNames.GEOMETRY" :onClick="onSetActiveObjInfoTabName" />
        <custom-btn accesskey="m" title="Material" :active="activeObjInfoTabName === tabNames.MATERIAL" :data="tabNames.MATERIAL" :onClick="onSetActiveObjInfoTabName" />
        <custom-btn :link="internalUrls.SHADER_EDITOR" accesskey="w" iconClass="icon-shader-editor" class="xs" />
      </header>

      <section class="body">
        <object-section v-if="activeObjInfoTabName === tabNames.OBJECT" />
        <geometry-section v-if="activeObjInfoTabName === tabNames.GEOMETRY" />
        <material-section v-if="activeObjInfoTabName === tabNames.MATERIAL" :onSetActiveMaterialType="onSetActiveMaterialType" :activeMaterialType="activeMaterialType" />
      </section>

      <footer class="footer controls-row" />
    </resize-box>

    <canvas-section :isFullScreenMode="!isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
        <custom-btn iconClass="icon-move" class="xs" />
        <custom-btn iconClass="icon-rotate" class="xs" />
        <custom-btn iconClass="icon-scale" class="xs" />
        <div class="gap" />
        <input-file name="file1" />
      </div>

      <transition slot="sidebar" name="slide-meshes-list">
        <meshes-list v-show="isVisibleObjectsList" />
      </transition>
    </canvas-section>
  </div>
</template>

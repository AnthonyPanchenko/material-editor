<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import GeometricObjects from '../geometric-objects/GeometricObjects.vue';
import DrawingBoard from '../canvas-board/DrawingBoard.vue';

import tabNames from './constants/tabNames';
import * as internalUrls from '../../common/constants/internal-urls';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import ShadersGallery from '../shaders-gallery/ShadersGallery.vue';

import ObjectSection from './components/ObjectSection.vue';
import MaterialSection from './components/MaterialSection.vue';
import GeometrySection from './components/GeometrySection.vue';

export default {
  name: 'MaterialEditor',
  components: {
    MaterialSection,
    ObjectSection,
    GeometrySection,
    CustomBtn,
    GeometricObjects,
    ShadersGallery,
    DrawingBoard,
    ResizeBox,
    PresentationFooter
  },
  data() {
    return {
      tabNames,
      isOpenShadersGalleryWindow: false,
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
    onOpenShadersGalleryWindow() {
      this.isOpenShadersGalleryWindow = !this.isOpenShadersGalleryWindow;
    },
    onCloseShadersGalleryWindow() {
      if (this.isOpenShadersGalleryWindow) {
        this.isOpenShadersGalleryWindow = false;
      }
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
  <div class="editor-container">
    <shaders-gallery :isOpen="isOpenShadersGalleryWindow" :onClose="onCloseShadersGalleryWindow" />

    <resize-box v-if="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetControlsPanelWidth" :size="controlsPanelWidth" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn accesskey="o" title="Object" :active="activeObjInfoTabName === tabNames.OBJECT" :data="tabNames.OBJECT" :onClick="onSetActiveObjInfoTabName" />
          <custom-btn accesskey="g" title="Geometry" :active="activeObjInfoTabName === tabNames.GEOMETRY" :data="tabNames.GEOMETRY" :onClick="onSetActiveObjInfoTabName" />
          <custom-btn accesskey="m" title="Material" :active="activeObjInfoTabName === tabNames.MATERIAL" :data="tabNames.MATERIAL" :onClick="onSetActiveObjInfoTabName" />
          <custom-btn :link="internalUrls.SHADER_EDITOR" accesskey="w" iconClass="icon-shader-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <object-section v-if="activeObjInfoTabName === tabNames.OBJECT" />
        <geometry-section v-if="activeObjInfoTabName === tabNames.GEOMETRY" />
        <material-section v-if="activeObjInfoTabName === tabNames.MATERIAL" :onSetActiveMaterialType="onSetActiveMaterialType" :activeMaterialType="activeMaterialType" />
      </section>

      <footer class="controls-footer">
        <div class="controls-row"></div>
      </footer>
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-list" class="xs" accesskey="q" :onClick="onToggleObjectsList" />
          <custom-btn iconClass="icon-move" class="xs" />
          <custom-btn iconClass="icon-rotate" class="xs" />
          <custom-btn iconClass="icon-scale" class="xs" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <geometric-objects v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box">
          <drawing-board />
        </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>

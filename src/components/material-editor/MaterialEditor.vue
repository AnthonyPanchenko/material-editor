<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputFile from '../../common/components/input-file/InputFile.vue';

import tabNames from './constants/tabNames';
import * as internalUrls from '../../common/constants/internal-urls';

import ShadersGallery from '../shaders-gallery/ShadersGallery.vue';
import MaterialSection from './components/MaterialSection.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';

export default {
  name: 'MaterialEditor',
  components: {
    MaterialSection,
    InputFile,
    CustomBtn,
    CanvasSection,
    ShadersGallery,
    ResizeBox
  },
  data() {
    return {
      tabNames,
      internalUrls
    };
  },
  computed: mapState([
    'controlsPanelWidth',
    'activeMaterialType',
    'isVisibleControlsPanel',
  ]),
  methods: {
    ...mapActions([
      'onSetActiveMaterialType',
      'onSetControlsPanelWidth',
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
        <custom-btn :link="internalUrls.SHADER_EDITOR" accesskey="w" iconClass="icon-shader-editor" class="xs" />
      </header>

      <section class="body">
        <material-section :onSetActiveMaterialType="onSetActiveMaterialType" :activeMaterialType="activeMaterialType" />
      </section>

      <footer class="footer controls-row" />
    </resize-box>

    <canvas-section :isFullScreenMode="!isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
      <div slot="header" class="header controls-row">
        <custom-btn iconClass="icon-sphere" />
        <custom-btn iconClass="icon-cube" />
        <custom-btn iconClass="icon-cylinder" />
        <custom-btn iconClass="icon-torus" />
        <custom-btn iconClass="icon-plane" />
      </div>
    </canvas-section>
  </div>
</template>

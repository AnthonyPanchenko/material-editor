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
    DrawingBoard,
    ResizeBox,
    PresentationFooter
  },
  data() {
    return {
      tabNames,
      internalUrls
    };
  },
  computed: mapState([
    'widthCtrlBox',
    'activeTabName',
    'isVisibleControlsPanel',
    'isVisibleObjectsList'
  ]),
  methods: {
    ...mapActions([
      'onSetActiveTabName',
      'onSetCtrlBoxWidth',
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
    },
    onTabClick(tabName) {
      if (tabName === this.activeTabName) {
        console.log('create new setting');
      } else {
        this.onSetActiveTabName(tabName);
      }
    }
  }
};
</script>

<template>
  <div class="editor-container">

    <resize-box v-if="isVisibleControlsPanel" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn accesskey="o" title="Object" :active="activeTabName === tabNames.OBJECT" :data="tabNames.OBJECT" :onClick="onTabClick" />
          <custom-btn accesskey="g" title="Geometry" :active="activeTabName === tabNames.GEOMETRY" :data="tabNames.GEOMETRY" :onClick="onTabClick" />
          <custom-btn accesskey="m" title="Material" :active="activeTabName === tabNames.MATERIAL" :data="tabNames.MATERIAL" :onClick="onTabClick" />
          <custom-btn :link="internalUrls.SHADER_EDITOR" accesskey="w" iconClass="icon-shader-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <object-section v-if="activeTabName === tabNames.OBJECT" />
        <geometry-section v-if="activeTabName === tabNames.GEOMETRY" />
        <material-section v-if="activeTabName === tabNames.MATERIAL" />
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

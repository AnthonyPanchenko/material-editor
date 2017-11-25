<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import DrawingBoard from '../canvas-board/DrawingBoard.vue';

import tabNames from './constants/tabNames';
import internalUrls from '../../common/constants/internal-urls';

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import MaterialSection from '../material-section/MaterialSection.vue';
import ObjectSection from '../object-section/ObjectSection.vue';
import GeometrySection from '../geometry-section/GeometrySection.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';

export default {
  name: 'MaterialEditor',
  components: {
    MaterialSection,
    ObjectSection,
    GeometrySection,
    CustomBtn,
    ItemObjList,
    DrawingBoard,
    ResizeBox,
    PresentationFooter
  },
  data() {
    return {
      tabNames,
      urls: internalUrls
    };
  },
  computed: mapState([
    'widthCtrlBox',
    'activeTabName',
    'isVisibleControlsBox',
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
    onTabClick(event) {
      if (event.target.dataset.tab === this.activeTabName) {
        console.log('create new setting');
      } else {
        this.onSetActiveTabName(event.target.dataset.tab);
      }
    }
  }
};
</script>

<template>
  <div class="editor-container">

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" class="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn accesskey="s" iconClass="icon-settings" class="xs" />
          <custom-btn accesskey="o" title="Object" :active="activeTabName === tabNames.OBJECT" :data-tab="tabNames.OBJECT" :onClick="onTabClick" />
          <custom-btn accesskey="g" title="Geometry" :active="activeTabName === tabNames.GEOMETRY" :data-tab="tabNames.GEOMETRY" :onClick="onTabClick" />
          <custom-btn accesskey="m" title="Material" :active="activeTabName === tabNames.MATERIAL" :data-tab="tabNames.MATERIAL" :onClick="onTabClick" />
          <custom-btn :link="`/${urls.SHADER_EDITOR}`" accesskey="w" iconClass="icon-shader-editor" class="xs" />
        </div>
      </header>

      <section class="controls-content">
        <object-section v-if="activeTabName === tabNames.OBJECT" />
        <geometry-section  v-if="activeTabName === tabNames.GEOMETRY" />
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
          <item-obj-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box">
          <drawing-board />
        </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>

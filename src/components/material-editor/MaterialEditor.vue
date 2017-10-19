<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("materialEditor");

import CustomBtn from "../../common/components/custom-btn/CustomBtn.vue";
import ItemObjList from "../item-obj-list/ItemObjList.vue";
import CanvasBoard from "../canvas-board/CanvasBoard.vue";
import ResizeBox from "../resize-box/ResizeBox.vue";
import PresentationFooter from "../presentation-footer/PresentationFooter.vue";
import internalUrls from "../../common/constants/internal-urls";
import tabNames from "./constants/tabNames";

export default {
  name: "MaterialEditor",
  components: {
    CustomBtn,
    ItemObjList,
    CanvasBoard,
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
    "widthCtrlBox",
    "activeTabName",
    "isVisibleControlsBox",
    "isVisibleObjectsList"
  ]),
  methods: {
    ...mapActions([
      "onSetActiveTabName",
      "onSetCtrlBoxWidth",
      "onToggleObjectsList",
      "onToggleFullScreenMode"
    ]),
    onTabClick(event) {
      if (event.target.dataset.tab === this.activeTabName) {
        console.log("create new setting");
      } else {
        this.onSetActiveTabName(event.target.dataset.tab);
      }
    }
  }
};
</script>

<template>
  <div class="editor-container">

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" customClass="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-settings" customClass="ctrl-btn-default xs" />
          <custom-btn title="Object" :active="activeTabName === tabNames.OBJECT" :data-tab="tabNames.OBJECT" :onCustomClick="onTabClick" />
          <custom-btn title="Geometry" :active="activeTabName === tabNames.GEOMETRY" :data-tab="tabNames.GEOMETRY" :onCustomClick="onTabClick" />
          <custom-btn title="Material" :active="activeTabName === tabNames.MATERIAL" :data-tab="tabNames.MATERIAL" :onCustomClick="onTabClick" />
          <custom-btn :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-shader-editor" customClass="ctrl-btn-default xs" />
        </div>
      </header>

      <section class="controls-content">
        <div v-if="activeTabName === tabNames.OBJECT">
            tabNames.OBJECT
        </div>
        <div v-if="activeTabName === tabNames.GEOMETRY">
            tabNames.GEOMETRY
        </div>
        <div v-if="activeTabName === tabNames.MATERIAL">
            tabNames.MATERIAL
        </div>
      </section>

      <footer class="controls-footer">
        <div class="controls-row"></div>
      </footer>
    </resize-box>

    <section class="presentation-section">
      <header class="presentation-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-list" customClass="ctrl-btn-default xs" :onCustomClick="onToggleObjectsList" />
          <custom-btn title="Translate" customClass="ctrl-btn-default md" />
          <custom-btn title="Rotate" customClass="ctrl-btn-default md" />
          <custom-btn title="Scale" customClass="ctrl-btn-default md" />
        </div>
      </header>

      <section class="presentation-content">
        <transition name="slide-obj-list">
          <item-obj-list v-if="isVisibleObjectsList" />
        </transition>
        <div class="canvas-box"> canvas </div>
      </section>

      <presentation-footer :isInFullScreenMode="isVisibleControlsBox" :onToggleFullScreenMode="onToggleFullScreenMode" />
    </section>

  </div>
</template>

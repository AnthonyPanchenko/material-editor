<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('materialEditor');

import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import ItemObjList from '../item-obj-list/ItemObjList.vue';
import CanvasBoard from '../canvas-board/CanvasBoard.vue';
import ResizeBox from '../resize-box/ResizeBox.vue';
import PresentationFooter from '../presentation-footer/PresentationFooter.vue';
import internalUrls from '../../common/constants/internal-urls';

export default {
  name: 'MaterialEditor',
  components: {
    CustomBtn,
    ItemObjList,
    CanvasBoard,
    ResizeBox,
    PresentationFooter,
  },
  data() {
    return {
      urls: internalUrls,
    }
  },
  computed: mapState(['widthCtrlBox', 'isVisibleControlsBox', 'isVisibleObjectsList']),
  methods: mapActions(['onSetCtrlBoxWidth', 'onToggleObjectsList', 'onToggleFullScreenMode']),
}
</script>

<template>
  <div class="editor-container">

    <resize-box v-if="isVisibleControlsBox" tag="section" resize="column" :onEndOfResize="onSetCtrlBoxWidth" :size="widthCtrlBox" customClass="controls-section">
      <header class="controls-header">
        <div class="controls-row">
          <custom-btn iconClass="icon-settings" customClass="ctrl-btn-default xs" />
          <custom-btn title="Object" />
          <custom-btn title="Geometry" />
          <custom-btn title="Material" />
          <custom-btn :link="`/${urls.SHADER_EDITOR}`" iconClass="icon-shader-editor" customClass="ctrl-btn-default xs" />
        </div>
      </header>

      <section class="controls-content">
        controls-content
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

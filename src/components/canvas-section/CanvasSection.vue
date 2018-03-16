<script>
import noop from '../../common/utils/noop';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'CanvasSection',
  props: {
    onToggleFullScreenMode: { type: Function, default: noop },
    isFullScreenMode: { type: Boolean, default: false } // isVisibleControlsPanel
  },
  components: {
    CustomBtn
  }
}
</script>

<template>
  <section class="container canvas-section">
    <slot name="header"></slot>

    <div class="body">
      <slot name="sidebar"></slot>
      <div class="canvas-box"></div>
    </div>

    <div class="footer controls-row">
      <span class="label fps">FPS 60</span>
      <custom-btn :iconClass="isFullScreenMode ? 'icon-minimize' : 'icon-maximize'" class="ctrl-btn default xs" accesskey="b" :onClick="onToggleFullScreenMode" />
    </div>
  </section>
</template>

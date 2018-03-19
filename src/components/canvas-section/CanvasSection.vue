<script>
import noop from '../../common/utils/noop';
import ResizeObserver from 'resize-observer-polyfill';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

import { init, animate, onResize } from './utils/base-scene';

export default {
  name: 'CanvasSection',
  props: {
    onToggleFullScreenMode: { type: Function, default: noop },
    isFullScreenMode: { type: Boolean, default: false }
  },
  components: {
    CustomBtn
  },
  data() {
    return {}
  },
  methods: {
    onCanvasMouseUp() {
      console.log('onCanvasMouseUp');
    },
    onCanvasMouseDown() {
      console.log('onCanvasMouseDown');
    },
    onCanvasMouseMove() {
      console.log('onCanvasMouseMove');
    }
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    init(canvasContainer, canvasContainer.clientWidth, canvasContainer.clientHeight);
    animate();

    const canvasContainerObserveResizing = new ResizeObserver(entries => {
      onResize(entries[0].contentRect.width, entries[0].contentRect.height);
    });

    canvasContainerObserveResizing.observe(canvasContainer);
  }
}
</script>

<template>
  <section class="container canvas-section">
    <slot name="header"></slot>

    <div class="body">
      <slot name="sidebar"></slot>
      <div ref="canvasContainer" class="canvas-box" />
    </div>

    <div class="footer controls-row">
      <span class="label fps">FPS 60</span>
      <custom-btn
        accesskey="b"
        class="ctrl-btn default xs"
        :iconClass="isFullScreenMode ? 'icon-minimize' : 'icon-maximize'"
        :onClick="onToggleFullScreenMode"
      />
    </div>
  </section>
</template>

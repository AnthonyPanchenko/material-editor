<script>
import * as THREE from 'three';
import noop from '../../common/utils/noop';
import debounce from './utils/resize-observer-debounce';
import emptyObject from '../../common/utils/emptyObject';
import ResizeObserver from 'resize-observer-polyfill';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

import { createCamera, createRenderer, createControls, runAnimation } from './utils/base-scene';

export default {
  name: 'CanvasSection',
  props: {
    onToggleFullScreenMode: { type: Function, default: noop },
    isFullScreenMode: { type: Boolean, default: false },
    geometryToScene: { type: Object, default: emptyObject }
  },
  components: {
    CustomBtn
  },
  data() {
    return {
      scene: new THREE.Scene(),
      gridHelper: new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888)
    }
  },
  methods: {
    onResize(width, height, camera, renderer) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
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

    this.camera = createCamera(canvasContainer.clientWidth, canvasContainer.clientHeight);
    this.renderer = createRenderer(canvasContainer.clientWidth, canvasContainer.clientHeight);
    this.controls = createControls(this.camera, this.renderer);

    this.scene.add(this.gridHelper);
    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(30, entries => {
      this.onResize(entries[0].contentRect.width, entries[0].contentRect.height, this.camera, this.renderer);
    }));

    canvasContainerObserveResizing.observe(canvasContainer);

    runAnimation(this.controls, this.renderer, this.scene, this.camera, noop);
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

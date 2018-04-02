<script>
import noop from '../../common/utils/noop';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import BaseScene from './utils/BaseScene';
import { getBasicGeometryByType } from './utils/base-scene-helper';

export default {
  name: 'CanvasSection',
  props: {
    onToggleFullScreenMode: { type: Function, default: noop },
    isFullScreenMode: { type: Boolean, default: false },
    transformationMode: { type: String, default: '' },
    geometryToScene: { type: String, default: '' }
  },
  components: {
    CustomBtn
  },
  data() {
    return {
      scene: {}
    }
  },
  watch: {
    transformationMode(mode) {
      this.scene.controls.transformControls.setMode(mode);
    },
    geometryToScene(type) {
      const geometry = getBasicGeometryByType(type);
      this.scene.addMesh(geometry);
    }
  },
  methods: {
    selectMeshInSceneCallback(obj) {
      console.log(obj);
    },
    deselectMeshInSceneCallback() {
      console.log('deselectMesh');
    },
    addCustomMeshToScene() {
      const geometry = null;
      const json = this.scene.addMesh(geometry);
    },
    removeMesh(uuid) {
      this.scene.removeMesh(uuid);
    }
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    this.scene = new BaseScene(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      this.selectMeshInSceneCallback,
      this.deselectMeshInSceneCallback
    );

    this.scene.init(canvasContainer);
  },
  beforeDestroy() {
    this.scene.removeEventListeners();
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

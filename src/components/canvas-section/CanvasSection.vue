<script>
import noop from '../../common/utils/noop';
import emptyObject from '../../common/utils/emptyObject';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import BaseScene from './utils/BaseScene';
import { getBasicGeometryByType } from './utils/base-scene-helper';

export default {
  name: 'CanvasSection',
  props: {
    objects: { type: Object, default: emptyObject },
    materials: { type: Object, default: emptyObject },
    geometrys: { type: Object, default: emptyObject },
    currentEditableIds: { type: Object, default: emptyObject },
    transformationMode: { type: String, default: '' },
    objectToScene: { type: String, default: '' }
  },
  components: {
    CustomBtn
  },
  data() {
    return {
      baseScene: {}
    }
  },
  watch: {
    transformationMode(mode) {
      this.baseScene.controls.transformControls.setMode(mode);
    },
    objectToScene(type) {
      const geometry = getBasicGeometryByType(type);
      console.log(geometry);
      this.baseScene.addMesh(geometry);
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
      // const geometry = null;
      // const json = this.baseScene.addMesh(geometry);
    },
    removeMesh(uuid) {
      this.baseScene.removeMesh(uuid);
    }
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    this.baseScene = new BaseScene(
      canvasContainer.clientWidth,
      canvasContainer.clientHeight,
      this.selectMeshInSceneCallback,
      this.deselectMeshInSceneCallback
    );

    this.baseScene.init(canvasContainer);
  },
  beforeDestroy() {
    this.baseScene.removeEventListeners();
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
    </div>
  </section>
</template>

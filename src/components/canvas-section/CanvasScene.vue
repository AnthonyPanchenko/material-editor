<script>
import * as THREE from 'three';
import noop from '../../common/utils/noop';
import debounce from './utils/resize-observer-debounce';
import emptyObject from '../../common/utils/emptyObject';
import ResizeObserver from 'resize-observer-polyfill';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import geometryTypes from '../../common/constants/basic-geometry-types';
import { createCamera, createRenderer, createControls, runAnimation } from './utils/base-scene';

export default {
  name: 'CanvasScene',
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
      geometryTypes,
      scene: new THREE.Scene(),
      raycaster: new THREE.Raycaster(),
      gridHelper: new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888)
    }
  },
  watch: {
    geometryToScene(geometryType) {
      const geometry = this.getBasicGeometryByType(geometryType);

      if (geometry) {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
        this.scene.add(mesh);
        mesh.add(new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
        ));
      }
    }
  },
  methods: {
    onResize(width, height, camera, renderer) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
    getBasicGeometryByType(type) {
      switch (type) {
        case this.geometryTypes.SPHERE:
          return new THREE.SphereGeometry(3.5, 15, 15);
        case this.geometryTypes.CUBE:
          return new THREE.BoxGeometry(5, 5, 5);
        case this.geometryTypes.CYLINDER:
          return new THREE.CylinderGeometry(2, 2, 15, 20);
        case this.geometryTypes.TORUS:
          return new THREE.TorusGeometry(5, 1.5, 16, 35);
        case this.geometryTypes.PLANE:
          return new THREE.PlaneGeometry(12, 12);
        default:
          return null;
      }
    },
    onCanvasMouseUp() {
      console.log('onCanvasMouseUp');
    },
    onCanvasMouseDown() {
      console.log('onCanvasMouseDown');
    },
    onCanvasMouseMove(event) {
      event.preventDefault();
      const x = (event.offsetX / event.target.clientWidth) * 2 - 1;
      const y = -(event.offsetY / event.target.clientHeight) * 2 + 1;

      console.clear();
      console.log('x = ', x);
      console.log('y = ', y);
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
    this.renderer.domElement.addEventListener('mousemove', this.onCanvasMouseMove);
  },
  beforeDestroy() {
    this.renderer.domElement.removeEventListener('mousemove', this.onCanvasMouseMove);
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

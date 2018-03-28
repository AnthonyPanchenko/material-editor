<script>
import * as THREE from 'three';
import 'three/examples/js/controls/TransformControls';

import noop from '../../common/utils/noop';
import debounce from './utils/resize-observer-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import geometryTypes from '../../common/constants/basic-geometry-types';
import { createCamera, createRenderer, createControls, runAnimation } from './utils/base-scene';

export default {
  name: 'CanvasScene',
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
      geometryTypes,
      sceneObjects: [],
      camera: null,
      renderer: null,
      transformControls: null,
      intersectedObject: null,
      scene: new THREE.Scene(),
      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      gridHelper: new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888)
    }
  },
  watch: {
    transformationMode(mode) {
      if (this.transformControls) {
        this.transformControls.setMode(mode);
      }
    },
    geometryToScene(type) {
      const geometry = this.getBasicGeometryByType(type);

      if (geometry) {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
        mesh.add(new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
        ));

        this.scene.add(mesh);
        this.sceneObjects.push(mesh);

        if (this.transformControls) {
          this.transformControls.attach(mesh);
          this.scene.add(this.transformControls);
        }
      }
    }
  },
  methods: {
    onResize(width, height, camera, renderer) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
    defineIntersections(camera) {
      // this.raycaster.setFromCamera(this.mouse, camera);
      // const intersects = this.raycaster.intersectObjects(this.sceneObjects);

      // if (intersects.length) {
      //   if (intersects[0].object.children[0] && intersects[0].object.children[0].material) {
      //     this.intersectedObject = intersects[0].object;
      //     this.intersectedObject.children[0].material.color.set(0x4893ff);
      //   }
      // } else if (this.intersectedObject) {
      //   this.intersectedObject.children[0].material.color.set(0xffffff);
      // }
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

    renderScene() {
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
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
      this.mouse.x = (event.offsetX / event.target.clientWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / event.target.clientHeight) * 2 + 1;
    }
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    this.camera = createCamera(canvasContainer.clientWidth, canvasContainer.clientHeight);
    this.renderer = createRenderer(canvasContainer.clientWidth, canvasContainer.clientHeight);
    this.controls = createControls(this.camera, this.renderer);

    this.scene.add(this.gridHelper);
    this.controls.update();

    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(30, entries => {
      this.onResize(entries[0].contentRect.width, entries[0].contentRect.height, this.camera, this.renderer);
    }));

    canvasContainerObserveResizing.observe(canvasContainer);

    const renderAsDependency = () => {
      this.defineIntersections(this.camera);
    };

    runAnimation(this.controls, this.renderer, this.scene, this.camera, renderAsDependency);
    this.renderer.domElement.addEventListener('mousemove', this.onCanvasMouseMove);

    this.transformControls = new THREE.TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener('change', this.renderScene);

    this.renderer.render(this.scene, this.camera);
  },
  beforeDestroy() {
    this.renderer.domElement.removeEventListener('mousemove', this.onCanvasMouseMove);
    this.transformControls.removeEventListener('change', this.renderScene);
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

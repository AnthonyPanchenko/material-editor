import * as THREE from 'three';
import 'three/examples/js/controls/TransformControls';

import debounce from './resize-observer-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { createCamera, createRenderer, createControls } from './base-scene-helper';

class BaseScene {
  constructor(canvasWidth, canvasHeight) {
    this.sceneObjects = [];
    this.selectedObject = null;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);

    this.camera = createCamera(canvasWidth, canvasHeight);
    this.renderer = createRenderer(canvasWidth, canvasHeight);
    this.controls = createControls(this.camera, this.renderer);
    this.transformControls = new THREE.TransformControls(this.camera, this.renderer.domElement);
  }

  getIntersects(clickPosition) {
    this.raycaster.setFromCamera(clickPosition, this.camera);
    return this.raycaster.intersectObjects(this.sceneObjects);
  }

  getClickPositions(event) {
    const positions = new THREE.Vector2();
    positions.set((event.offsetX / event.target.clientWidth) * 2 - 1, -(event.offsetY / event.target.clientHeight) * 2 + 1);
    return positions;
  }

  selectMesh(mesh) {
    console.log(mesh);
  }

  deselectMesh() {
    console.log('deselectMesh');
  }

  addMaterial() {
    console.log('addMaterial');
  }

  removeMaterial() {
    console.log('removeMaterial');
  }

  addGeometry(geometry) {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
    mesh.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    ));

    this.scene.add(mesh);
    this.sceneObjects.push(mesh);

    this.transformControls.attach(mesh);
    this.scene.add(this.transformControls);
  }

  removeGeometry(geometry) {
    console.log('removeGeometry');
  }

  onCanvasClick(event) {
    const intersectsArr = this.getIntersects(this.getClickPositions(event));

    if (intersectsArr.length) {
      // if (this.selectedObject intersectsArr[0].object) {
      this.selectMesh(intersectsArr[0]);
      // }
    } else if (this.selectedObject) {
      this.selectedObject = null;
    }
  }

  // onCanvasMove(event) {
  //   event.preventDefault();
  //   this.mouse.x = (event.offsetX / event.target.clientWidth) * 2 - 1;
  //   this.mouse.y = -(event.offsetY / event.target.clientHeight) * 2 + 1;

  //   console.clear();
  //   console.log(this.mouse);
  // }

  // renderIntersections() {
  //   this.defineIntersections();
  // }

  // defineIntersections() {
  //   this.raycaster.setFromCamera(this.mouse, this.camera);
  //   const intersects = this.raycaster.intersectObjects(this.sceneObjects);

  //   if (intersects.length) {
  //     if (intersects[0].object.children[0] && intersects[0].object.children[0].material) {
  //       this.intersectedObject = intersects[0].object;
  //       this.intersectedObject.children[0].material.color.set(0x4893ff);
  //     }
  //   } else if (this.intersectedObject) {
  //     this.intersectedObject.children[0].material.color.set(0xffffff);
  //   }
  // }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize(entries) {
    this.canvasWidth = entries[0].contentRect.width;
    this.canvasHeight = entries[0].contentRect.height;
    this.camera.aspect = this.canvasWidth / this.canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // this.renderIntersections();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  init(canvasContainer) {
    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(7, this.onResize.bind(this)));
    canvasContainerObserveResizing.observe(canvasContainer);

    this.scene.add(this.gridHelper);
    this.controls.update();

    this.animate.apply(this);
    this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));
    // this.renderer.domElement.addEventListener('mousemove', this.onCanvasMove.bind(this));
    this.transformControls.addEventListener('change', this.renderScene.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  removeEventListeners() {
    this.renderer.domElement.removeEventListener('click', this.onCanvasClick);
    // this.renderer.domElement.removeEventListener('mousemove', this.onCanvasMove);
    this.transformControls.removeEventListener('change', this.renderScene);
  }
}

export default BaseScene;

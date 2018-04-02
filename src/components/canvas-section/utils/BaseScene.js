import * as THREE from 'three';

import debounce from './resize-observer-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { createCamera, createRenderer, createControls } from './base-scene-helper';

class BaseScene {
  constructor(canvasWidth, canvasHeight, selectMesh, deselectMesh) {
    this.sceneMeshes = [];
    this.selectedMesh = null;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);

    this.selectMeshCallback = selectMesh;
    this.deselectMeshCallback = deselectMesh;

    this.camera = createCamera(canvasWidth, canvasHeight);
    this.renderer = createRenderer(canvasWidth, canvasHeight);
    this.controls = createControls(this.camera, this.renderer);
  }

  getIntersects(clickPosition) {
    this.raycaster.setFromCamera(clickPosition, this.camera);
    return this.raycaster.intersectObjects(this.sceneMeshes);
  }

  getClickPositions(event) {
    const positions = new THREE.Vector2();
    positions.set((event.offsetX / event.target.clientWidth) * 2 - 1, -(event.offsetY / event.target.clientHeight) * 2 + 1);
    return positions;
  }

  selectMesh(mesh) {
    this.selectedMesh = mesh;
    this.controls.transformControls.attach(mesh);
    if (typeof this.selectMeshCallback === 'function') {
      this.selectMeshCallback(mesh.object.toJSON());
    }
  }

  deselectMesh() {
    this.controls.transformControls.detach(this.selectedMesh);
    this.selectedMesh = null;
    if (typeof this.deselectMeshCallback === 'function') {
      this.deselectMeshCallback();
    }
  }

  addMesh(geometry) {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));
    mesh.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    ));

    this.scene.add(mesh);
    this.sceneMeshes.push(mesh);

    return mesh;
  }

  removeMesh(uuid) {
    if (this.selectedMesh && this.selectedMesh.object.uuid === uuid) {
      this.controls.transformControls.detach(this.selectedMesh);
      this.scene.remove(this.selectedMesh);
      this.sceneMeshes = this.sceneMeshes.filter(mesh => mesh.object.uuid !== uuid);
      this.selectedMesh = null;
    }
  }

  onCanvasClick(event) {
    const intersectsArr = this.getIntersects(this.getClickPositions(event));

    if (intersectsArr.length) {
      if (this.selectedMesh && (this.selectedMesh.object.uuid !== intersectsArr[0].object.uuid)) {
        this.selectMesh(intersectsArr[0]);
      }
    } else if (this.selectedMesh) {
      this.deselectMesh();
    }
  }

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
    this.controls.orbitControls.update();
    this.controls.transformControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  init(canvasContainer) {
    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(7, this.onResize.bind(this)));
    canvasContainerObserveResizing.observe(canvasContainer);

    this.scene.add(this.gridHelper);
    this.controls.orbitControls.update();
    this.controls.transformControls.update();

    this.animate.apply(this);
    this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));
    this.controls.transformControls.addEventListener('change', this.renderScene.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  removeEventListeners() {
    this.renderer.domElement.removeEventListener('click', this.onCanvasClick);
    this.controls.transformControls.removeEventListener('change', this.renderScene);
  }
}

export default BaseScene;

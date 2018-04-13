import * as THREE from 'three';

import noop from './noop';
import debounce from './resize-observer-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { createCamera, createRenderer, createControls } from './base-scene-helper';

class BaseScene {
  constructor(canvasWidth, canvasHeight, selectMesh, deselectMesh) {
    this.requestAnimationId = undefined;
    this.selectedMeshIndex = undefined;
    this.selectedMesh = null;
    this.sceneMeshes = [];

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);

    this.selectMeshCallback = selectMesh || noop;
    this.deselectMeshCallback = deselectMesh || noop;

    this.camera = createCamera(canvasWidth, canvasHeight);
    this.renderer = createRenderer(canvasWidth, canvasHeight);
    this.controls = createControls(this.camera, this.renderer);
  }

  getIntersects(clickPosition) {
    this.raycaster.setFromCamera(clickPosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.sceneMeshes);

    if (intersects.length && intersects[0].object.uuid) {
      return {
        mesh: intersects[0],
        index: this.scene.children.findIndex(mesh => mesh.uuid === intersects[0].object.uuid)
      };
    }

    return null;
  }

  getClickPositions(event) {
    const positions = new THREE.Vector2();
    positions.set((event.offsetX / event.target.clientWidth) * 2 - 1, -(event.offsetY / event.target.clientHeight) * 2 + 1);
    return positions;
  }

  selectMesh(index) {
    this.selectedMeshIndex = index;
    this.selectedMesh = this.scene.children[index];
    this.controls.transformControls.attach(this.scene.children[index]);
    this.selectMeshCallback(this.scene.children[index]);
  }

  selectMeshByUuid(uuid) {
    if (uuid) {
      const index = this.scene.children.findIndex(mesh => mesh.uuid === uuid);

      if (index !== -1) {
        this.selectMesh(index);
      }
    }
  }

  deselectMesh() {
    this.controls.transformControls.detach(this.selectedMesh);
    this.selectedMesh = null;
    this.selectedMeshIndex = undefined;
    this.deselectMeshCallback();
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

  removeSelectedMesh() {
    this.sceneMeshes = this.sceneMeshes.filter(mesh => mesh.uuid !== this.selectedMesh.uuid);
    this.controls.transformControls.detach(this.selectedMesh);
    this.scene.remove(this.selectedMesh);
    this.selectedMeshIndex = undefined;
    this.selectedMesh = null;
  }

  removeMeshByUuuid(uuid) {
    if (uuid) {
      if (this.selectedMesh && this.selectedMesh.uuid === uuid) {
        this.removeSelectedMesh();
      } else {
        const mesh = this.scene.children.find(mesh => mesh.uuid === uuid);
        if (mesh) {
          this.scene.remove(mesh);
        }
      }
    }
  }

  onKeydown(event) {
    if (this.selectedMesh && event.keyCode === 46) {
      if (confirm('Are you sure?')) {
        this.removeSelectedMesh();
      }
    }
  }

  onCanvasClick(event) {
    const intersected = this.getIntersects(this.getClickPositions(event));

    if (intersected) {
      if (this.selectedMeshIndex === undefined || this.selectedMeshIndex !== intersected.index) {
        this.selectMesh(intersected.index);
      }
    } else if (this.selectedMeshIndex !== undefined) {
      this.deselectMesh();
    }
  }

  renderScene() {
    this.controls.orbitControls.update();
    this.controls.transformControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize(entries) {
    this.canvasWidth = entries[0].contentRect.width;
    this.canvasHeight = entries[0].contentRect.height;
    this.camera.aspect = this.canvasWidth / this.canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
  }

  animationLoop(time) {
    this.requestAnimationId = undefined;
    this.startAnimation();
  }

  startAnimation() {
    if (!this.requestAnimationId) {
      this.requestAnimationId = requestAnimationFrame(this.animationLoop.bind(this));
      this.renderScene();
    }
  }

  stopAnimation() {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = undefined;
    }
  }

  onCanvasMove() {
    this.renderScene();
  }

  init(canvasContainer) {
    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(7, this.onResize.bind(this)));
    canvasContainerObserveResizing.observe(canvasContainer);

    this.scene.add(this.gridHelper);
    this.scene.add(this.controls.transformControls);

    document.addEventListener('keydown', this.onKeydown.bind(this));
    this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));
    this.renderer.domElement.addEventListener('mousemove', this.onCanvasMove.bind(this));
    this.renderer.domElement.addEventListener('wheel', this.onCanvasMove.bind(this));

    this.startAnimation();
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.onKeydown);
    this.renderer.domElement.removeEventListener('click', this.onCanvasClick);
    this.renderer.domElement.removeEventListener('mousemove', this.onCanvasMove);
    this.renderer.domElement.removeEventListener('wheel', this.onCanvasMove);
  }
}

export default BaseScene;

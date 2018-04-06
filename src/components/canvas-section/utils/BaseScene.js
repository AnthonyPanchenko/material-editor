import * as THREE from 'three';

import noop from '../../../common/utils/noop';
import debounce from './resize-observer-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import { createCamera, createRenderer, createControls } from './base-scene-helper';

class BaseScene {
  constructor(canvasWidth, canvasHeight, selectMesh, deselectMesh) {
    this.selectedMeshIndex = undefined;
    this.selectedMesh = null;

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

    this.avoidIntersectionsWith = ['00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111'];
  }

  getIntersects(clickPosition) {
    this.raycaster.setFromCamera(clickPosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length && intersects[0].uuid && this.avoidIntersectionsWith.indexOf(intersects[0].uuid) === -1) {
      return {
        mesh: intersects[0],
        index: this.scene.children.findIndex(o => o.uuid === intersects[0].uuid)
      };
    }

    return null;
  }

  getClickPositions(event) {
    const positions = new THREE.Vector2();
    positions.set((event.offsetX / event.target.clientWidth) * 2 - 1, -(event.offsetY / event.target.clientHeight) * 2 + 1);
    return positions;
  }

  updateMeshObject(prop, val) {

  }

  updateMeshMaterial(prop, val) {

  }

  updateMeshGeometry(prop, val) {

  }

  selectMesh(mesh) {
    this.selectedMesh = mesh;
    this.controls.transformControls.attach(mesh.object);
    this.selectMeshCallback(mesh.object.toJSON());
  }

  deselectMesh() {
    this.controls.transformControls.detach(this.selectedMesh.object);
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

    return mesh;
  }

  removeSelectedMesh() {
    if (this.selectedMesh) {
      this.controls.transformControls.detach(this.selectedMesh.object);
      this.scene.remove(this.selectedMesh.object);
      this.selectedMeshIndex = undefined;
      this.selectedMesh = null;
    }
  }

  removeMeshByUuuid(uuid) {
    if (uuid) {
      if (this.selectedMesh && this.selectedMesh.object.uuid === uuid) {
        this.controls.transformControls.detach(this.selectedMesh.object);
        this.scene.remove(this.selectedMesh);
        this.selectedMeshIndex = undefined;
        this.selectedMesh = null;
      } else {
        const mesh = this.scene.children.find(mesh => mesh.uuid === uuid);
        if (mesh) {
          this.scene.remove(mesh);
        }
      }
    }
  }

  onKeydown(event) {
    if (event.keyCode === 46) {
      this.removeSelectedMesh();
    }
  }

  onCanvasClick(event) {
    const intersected = this.getIntersects(this.getClickPositions(event));

    if (intersected) {
      if (this.selectedMeshIndex === undefined || this.selectedMeshIndex !== intersected.index) {
        this.selectMesh(intersected.mesh);
        this.selectedMeshIndex = intersected.index;
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

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderScene();
  }

  init(canvasContainer) {
    canvasContainer.appendChild(this.renderer.domElement);

    const canvasContainerObserveResizing = new ResizeObserver(debounce(7, this.onResize.bind(this)));
    canvasContainerObserveResizing.observe(canvasContainer);

    this.gridHelper.uuid = this.avoidIntersectionsWith[0];
    this.controls.transformControls.uuid = this.avoidIntersectionsWith[1];

    this.scene.add(this.gridHelper);
    this.scene.add(this.controls.transformControls);

    this.animate.apply(this);
    document.addEventListener('keydown', this.onKeydown.bind(this));
    this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.onKeydown);
    this.renderer.domElement.removeEventListener('click', this.onCanvasClick);
  }
}

export default BaseScene;

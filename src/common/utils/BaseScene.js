import * as THREE from 'three';

import ResizeObserver from 'resize-observer-polyfill';
import { noop, debounce } from './base-helper';
import { createCamera, createRenderer, createControls } from './base-scene-helper';

const consl = { // eslint-disable-line
  cl: function() {
    console.clear();
    return this;
  },
  log: function() {
    console.log(...arguments);
    return this;
  }
};

class BaseScene {
  constructor(canvasWidth, canvasHeight, selectObject, deselectObject) {
    this.requestAnimationId = undefined;
    this.selectedObjectIndex = undefined;
    this.selectedObject = null;
    this.sceneObjects = [];

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);

    this.selectObjectCallback = selectObject || noop;
    this.deselectObjectCallback = deselectObject || noop;

    this.camera = createCamera(canvasWidth, canvasHeight);
    this.renderer = createRenderer(canvasWidth, canvasHeight);
    this.controls = createControls(this.camera, this.renderer);
  }

  getIntersects(clickPosition) {
    this.raycaster.setFromCamera(clickPosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.sceneObjects);

    // console.log(this.sceneObjects);
    // consl.cl().log(intersects, this.scene.children);

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

  selectObject(index, mesh) {
    this.selectedObjectIndex = index;
    this.selectedObject = this.scene.children[index];
    this.controls.transformControls.attach(this.scene.children[index]);
    this.selectObjectCallback(mesh);
  }

  selectObjectByUuid(uuid) {
    if (uuid) {
      const index = this.scene.children.findIndex(obj => obj.uuid === uuid);

      if (index !== -1) {
        this.selectObject(index);
      }
    }
  }

  // deselectObject() {
  //   this.controls.transformControls.detach(this.selectedObject);
  //   this.selectedObject = null;
  //   this.selectedObjectIndex = undefined;
  //   this.deselectObjectCallback();
  // }

  removeHelper(object) {
    if (this.helpers[object.id] !== undefined) {
      var helper = this.helpers[object.id];
      helper.parent.remove(helper);
      delete this.helpers[object.id];
      this.signals.helperRemoved.dispatch(helper);
    }
  }

  addMesh(geometry) {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide }));

    mesh.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    ));

    this.scene.add(mesh);
    this.sceneObjects.push(mesh);

    return mesh;
  }

  removeSelectedObject() {
    // this.sceneObjects = this.sceneObjects.filter(obj => obj.uuid !== this.selectedObject.uuid);
    this.controls.transformControls.detach(this.selectedObject);
    this.scene.remove(this.selectedObject);
    this.selectedObjectIndex = undefined;
    this.selectedObject = null;
  }

  removeObjectByUuuid(uuid) {
    if (uuid) {
      if (this.selectedObject && this.selectedObject.uuid === uuid) {
        this.removeSelectedObject();
      } else {
        const obj = this.scene.children.find(obj => obj.uuid === uuid);
        if (obj) {
          this.scene.remove(obj);
        }
      }
    }
  }

  addLighting(lighting, helper) {
    if (helper) {
      const geometry = new THREE.SphereBufferGeometry(2, 4, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
      const picker = new THREE.Mesh(geometry, material);
      picker.name = 'picker';
      // picker.userData.object = lighting;
      picker.add(helper);

      this.scene.add(picker);
      this.sceneObjects.push(picker);
    } else {
      this.scene.add(lighting);
    }
  }

  onKeydown(event) {
    if (this.selectedObject && (event.keyCode === 46 || event.keyCode === 8)) {
      if (confirm('Are you sure?')) {
        this.removeSelectedObject();
      }
    }
  }

  onCanvasClick(event) {
    const intersected = this.getIntersects(this.getClickPositions(event));

    if (intersected) {
      if (this.selectedObjectIndex === undefined || this.selectedObjectIndex !== intersected.index) {
        this.selectObject(intersected.index, intersected.mesh);
      }
    }

    // else if (this.selectedObjectIndex !== undefined) {
    //   this.deselectObject();
    // }
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

import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

class BaseScene {
  constructor() {
    this.sceneObjects = [];
    this.camera = null;
    this.renderer = null;
    this.transformControls = null;
    this.intersectedObject = null;
    this.scene = new THREE.Scene();
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);
  }

  transformationMode(mode) {
    this.transformControls.setMode(mode);
  }

  geometryToScene(type) {
    const geometry = getBasicGeometryByType(type);

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

  defineIntersections(camera) {
    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.sceneObjects);

    if (intersects.length) {
      if (intersects[0].object.children[0] && intersects[0].object.children[0].material) {
        this.intersectedObject = intersects[0].object;
        this.intersectedObject.children[0].material.color.set(0x4893ff);
      }
    } else if (this.intersectedObject) {
      this.intersectedObject.children[0].material.color.set(0xffffff);
    }
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize(canvasWidth, canvasHeight) {
    this.camera.aspect = canvasWidth / canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasWidth, canvasHeight);
  }
}

export default BaseScene;

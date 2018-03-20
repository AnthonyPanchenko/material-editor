import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

// window.THREE = THREE;

export const createRenderer = (canvasWidth, canvasHeight) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);

  renderer.domElement.style.width = `${canvasWidth}px`;
  renderer.domElement.style.height = `${canvasHeight}px`;

  return renderer;
};

export const createCamera = (canvasWidth, canvasHeight) => {
  const camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.01, 1000);
  camera.position.set(0, 5, 20);
  camera.lookAt(new THREE.Vector3());

  return camera;
};

export const createControls = (camera, renderer) => {
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.maxPolarAngle = 0.9 * Math.PI / 2;
  controls.enableZoom = true;

  return controls;
};

// class BaseScene {
//   constructor(canvasContainer, canvasWidth, canvasHeight) {
//     this.camera = createCamera(canvasWidth, canvasHeight);
//     this._scene = new THREE.Scene();
//     this.gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);
//     this._renderer = createRenderer(canvasWidth, canvasHeight);
//     this.controls = createControls(this.camera, this._renderer);
//     this.animationId = '';
//   }

//   onResize(width, height) {
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//     this._renderer.setSize(width, height);
//   }

//   runAnimate() {}

//   stopAnimate() {
//     cancelAnimationFrame(this.animationId);
//   }

//   animate() {
//     requestAnimationFrame(animate);

//     this.controls.update();
//     this._renderer.render(this._scene, this.camera);
//   }

//   get renderer() {
//     return this._renderer;
//   }

//   get scene() {
//     return this._scene;
//   }

//   init() {
//     this._scene.add(this.gridHelper);
//     this.controls.update();
//   }
// };

// export default BaseScene;

// export const init = (canvasContainer, canvasWidth, canvasHeight) => {

//   var texture = new THREE.TextureLoader().load('/static/textures/cube.gif');
//   var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
//   var material = new THREE.MeshBasicMaterial({ map: texture });

//   mesh = new THREE.Mesh(geometry, material);
//   mesh.position.set(0, 3, 0);

//   scene.add(mesh);
//   scene.add(gridHelper);
// mesh.rotation.x += 0.005;
// mesh.rotation.y += 0.01;
//   canvasContainer.appendChild(renderer.domElement);
// }

import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

var camera, scene, renderer, controls;
var mesh;

window.THREE = THREE;

export const init = (canvasContainer, canvasWidth, canvasHeight) => {
  camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.01, 1000);
  camera.position.set(0, 5, 20);
  camera.lookAt(new THREE.Vector3());
  scene = new THREE.Scene();
  var gridHelper = new THREE.GridHelper(30, 30, 0xa39bcf, 0x888888);
  var texture = new THREE.TextureLoader().load('/static/textures/cube.gif');
  var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
  var material = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 3, 0);
  scene.add(mesh);
  scene.add(gridHelper);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);

  renderer.domElement.style.width = `${canvasWidth}px`;
  renderer.domElement.style.height = `${canvasHeight}px`;

  canvasContainer.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.maxPolarAngle = 0.9 * Math.PI / 2;
  controls.enableZoom = true;
  controls.update();
}

export const onResize = (width, height) => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

export const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

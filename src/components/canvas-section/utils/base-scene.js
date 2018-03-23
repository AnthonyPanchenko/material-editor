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

export const runAnimation = (controls, renderer, scene, camera, animateWith) => {
  function animate() {
    requestAnimationFrame(animate);
    animateWith();
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
};

import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

import geometryTypes from '../../../common/constants/basic-geometry-types';

// window.THREE = THREE;

export const getBasicGeometryByType = (type) => {
  switch (type) {
    case geometryTypes.SPHERE:
      return new THREE.SphereGeometry(3.5, 15, 15);
    case geometryTypes.CUBE:
      return new THREE.BoxGeometry(5, 5, 5);
    case geometryTypes.CYLINDER:
      return new THREE.CylinderGeometry(2, 2, 15, 20);
    case geometryTypes.TORUS:
      return new THREE.TorusGeometry(5, 1.5, 16, 35);
    case geometryTypes.PLANE:
      return new THREE.PlaneGeometry(12, 12);
    default:
      return null;
  }
};

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

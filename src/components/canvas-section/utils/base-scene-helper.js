import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/controls/TransformControls';

import objectTypes from '../../../common/constants/object-types';

// window.THREE = THREE;

export const getBasicGeometryByType = (type) => {
  switch (type) {
    case objectTypes.SPHERE:
      return new THREE.SphereGeometry(3.5, 15, 15);
    case objectTypes.CUBE:
      return new THREE.BoxGeometry(5, 5, 5);
    case objectTypes.CYLINDER:
      return new THREE.CylinderGeometry(2, 2, 15, 20);
    case objectTypes.TORUS:
      return new THREE.TorusGeometry(5, 1.5, 16, 35);
    case objectTypes.PLANE:
      return new THREE.PlaneGeometry(12, 12);
    case objectTypes.LIGHT:
    case objectTypes.PARTICLES_EMITTER:
      return new THREE.TorusGeometry(5, 1.5, 16, 35);
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
  const transformControls = new THREE.TransformControls(camera, renderer.domElement);
  const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  // orbitControls.maxPolarAngle = 0.9 * Math.PI / 2;
  orbitControls.enableZoom = true;

  return {
    transformControls,
    orbitControls
  };
};

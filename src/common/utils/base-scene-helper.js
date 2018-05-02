import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/controls/TransformControls';

import geometryTypes from '../constants/geometry-types';
import lightingTypes from '../constants/lighting-types';

// window.THREE = THREE;

export const getGeometryByType = (type) => {
  switch (type) {
    case geometryTypes.SPHERE:
      return new THREE.SphereGeometry(3.5, 15, 15);
    case geometryTypes.BOX:
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

export const getLightingByType = (type) => {
  switch (type) {
    case lightingTypes.POINTLIGHT:
      return new THREE.PointLight(0xff0000, 1, 100);
    case lightingTypes.SPOTLIGHT:
      return new THREE.SpotLight(0xffffff);
    case lightingTypes.DIRECTIONALLIGHT:
      return new THREE.DirectionalLight(0xffffff, 0.5);
    case lightingTypes.HEMISPHERELIGHT:
      return new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    case lightingTypes.AMBIENTLIGHT:
      return new THREE.AmbientLight(0x404040);
    default:
      return null;
  }
};

export const getLightingHelperByType = (type, lighting) => {
  switch (type) {
    case lightingTypes.POINTLIGHT:
      return new THREE.PointLightHelper(lighting, 1);
    case lightingTypes.SPOTLIGHT:
      return new THREE.SpotLightHelper(lighting);
    case lightingTypes.DIRECTIONALLIGHT:
      return new THREE.DirectionalLightHelper(lighting, 5);
    case lightingTypes.HEMISPHERELIGHT:
      return new THREE.HemisphereLightHelper(lighting, 5);
    default:
      return null;
  }
};

export const setObjectMaterial = (object, slot, newMaterial) => {
  if (Array.isArray(object.material)) {
    object.material[slot] = newMaterial;
  } else {
    object.material = newMaterial;
  }
};

export const getObjectMaterial = (object, slot) => {
  let material = object.material;

  if (Array.isArray(material)) {
    material = material[slot];
  }

  return material;
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
  orbitControls.enableKeys = false;

  return {
    transformControls,
    orbitControls
  };
};

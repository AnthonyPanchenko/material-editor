// object
const object = {
  castShadow: false,
  frustumCulled: true,
  name: "",
  position: { x: 0, y: 0, z: 0 },
  receiveShadow: false,
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  type: "Mesh",
  uuid: "0F767EAB-400F-478C-A79C-8074F43990EF",
  visible: true
};

// geometry
const geometry = {
  faces: Array(420),
  vertices: Array(212),
  name: "",
  type: "SphereGeometry",
  uuid: "F14813E2-A2C6-4AA8-8EED-9C3295A56DE2",

  // SphereGeometry
  parameters: {
    heightSegments: 15,
    phiLength: undefined,
    phiStart: undefined,
    radius: 3.5,
    thetaLength: undefined,
    thetaStart: undefined,
    widthSegments: 15
  },

  // PlaneGeometry
  parameters: {
    height: 12,
    heightSegments: undefined,
    width: 12,
    widthSegments: undefined
  },

  // TorusGeometry
  parameters: {
    arc: undefined,
    radialSegments: 16,
    radius: 5,
    tube: 1.5,
    tubularSegments: 35
  },

  // BoxGeometry
  parameters: {
    depth: 5,
    depthSegments: undefined,
    height: 5,
    heightSegments: undefined,
    width: 5,
    widthSegments: undefined
  },

  // CylinderGeometry
  parameters: {
    height: 15,
    heightSegments: undefined,
    openEnded: undefined,
    radialSegments: 20,
    radiusBottom: 2,
    radiusTop: 2,
    thetaLength: undefined,
    thetaStart: undefined
  }
};

// material

const material = {
  alphaMap: null,
  alphaTest: 0,
  aoMap: null,
  aoMapIntensity: 1,
  blendDst: 205,
  blendDstAlpha: null,
  blendEquation: 100,
  blendEquationAlpha: null,
  blendSrc: 204,
  blendSrcAlpha: null,
  blending: 1,
  clipIntersection: false,
  clipShadows: false,
  clippingPlanes: null,
  color: {
    b: 0.8,
    g: 0.8,
    r: 0.8
  },
  colorWrite: true,
  combine: 0,
  depthFunc: 3,
  depthTest: true,
  depthWrite: true,
  dithering: false,
  envMap: null,
  flatShading: false,
  fog: true,
  lightMap: null,
  lightMapIntensity: 1,
  lights: false,
  map: null,
  morphTargets: false,
  name: "",
  needsUpdate: false,
  opacity: 1,
  overdraw: 0,
  polygonOffset: false,
  polygonOffsetFactor: 0,
  polygonOffsetUnits: 0,
  precision: null,
  premultipliedAlpha: false,
  reflectivity: 1,
  refractionRatio: 0.98,
  shadowSide: null,
  side: 2,
  skinning: false,
  specularMap: null,
  transparent: false,
  type: "MeshBasicMaterial",
  uuid: "F14256A5-DD00-4BDC-AE97-1BBE9F406A11",
  vertexColors: 0,
  visible: true,
  wireframe: false,
  wireframeLinecap: "round",
  wireframeLinejoin: "round",
  wireframeLinewidth: 1
};


/////////////////

const jsonStructure = {
  geometries: [{
    heightSegments: 15,
    radius: 3.5,
    type: "SphereGeometry",
    uuid: "BA9E4B32-37D1-4A80-898F-ABAF064D48AB",
    widthSegments: 15
  }],

  materials: [{
    color: 13421772,
    depthFunc: 3,
    depthTest: true,
    depthWrite: true,
    emissiveIntensity: undefined,
    linewidth: undefined,
    rotation: undefined,
    side: 2,
    type: "MeshBasicMaterial",
    uuid: "2F2B36FA-9EFF-4B1F-BAAC-2AC9849F9A69"
  }],

  object: {
    children: [...],
    geometry: "BA9E4B32-37D1-4A80-898F-ABAF064D48AB",
    material: "2F2B36FA-9EFF-4B1F-BAAC-2AC9849F9A69",
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    type: "Mesh",
    uuid: "019250D4-C05F-4B03-BB3E-E3058D1BE645"
  }
};

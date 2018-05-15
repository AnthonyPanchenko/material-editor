export const basic = {
  INT: 'int',
  FLOAT: 'float',
  BOOL: 'bool'
};

export const vectors = {
  VEC2: 'vec2',
  VEC3: 'vec3',
  VEC4: 'vec4'
};

export const matrices = {
  MAT2: 'mat2',
  MAT3: 'mat3',
  MAT4: 'mat4'
};

export const texture = {
  SAMPLER2D: 'sampler2D'
};

const dataTypes = {
  ...basic,
  ...vectors,
  ...matrices,
  ...texture
};

export default dataTypes;

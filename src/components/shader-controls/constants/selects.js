const common = [
  { title: 'float', id: 'float' },
  { title: 'vec2', id: 'vec2' },
  { title: 'vec3', id: 'vec3' },
  { title: 'vec4', id: 'vec4' },
  { title: 'mat2', id: 'mat2' },
  { title: 'mat3', id: 'mat3' },
  { title: 'mat4', id: 'mat4' }
];

const selects = {
  uniformTypes: [
    { title: 'int', id: 'int' },
    ...common
  ],
  attributeTypes: common
};

export default selects;

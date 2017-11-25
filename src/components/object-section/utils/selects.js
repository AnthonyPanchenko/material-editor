import m from '../../../common/constants/materials-properties';

const selects = {
  [m.VERTEXCOLORS]: [
    { title: 'No', id: '' },
    { title: 'Face', id: 'face' },
    { title: 'Vertex', id: 'vertex' }
  ],
  [m.BLENDING]: [
    { title: 'Front', id: 'front' },
    { title: 'Back', id: 'back' },
    { title: 'Double', id: 'double' }
  ],
  [m.SIDE]: [
    { title: 'No', id: '' },
    { title: 'Normal', id: 'normal' },
    { title: 'Additive', id: 'additive' },
    { title: 'Subtractive', id: 'subtractive' },
    { title: 'Multiply', id: 'multiply' },
    { title: 'Custom', id: 'custom' }
  ]
};

export default selects;

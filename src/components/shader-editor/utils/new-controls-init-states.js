import shadersControlsTypes from '../../../common/constants/shaders-controls-types';

const newControlsInitStates = {
  [shadersControlsTypes.ATTRIBUTE]: {
    value: 0.1,
    name: '',
    ctrlType: 'attribute',
    mode: 'number',
    dataType: 'float'
  },
  [shadersControlsTypes.UNIFORM]: {
    value: [0.25, 0.78, -0.4],
    name: '',
    ctrlType: 'uniform',
    mode: 'vector',
    dataType: 'vec3'
  },
  [shadersControlsTypes.TEXTURE]: {
    value: '',
    mode: 'texture',
    name: '',
    ctrlType: 'texture',
    dataType: 'sampler2D'
  }
};

export default newControlsInitStates;

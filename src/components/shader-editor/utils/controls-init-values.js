import shadersDataTypes from '../../../common/constants/shaders-data-types';
import { matrices } from '../../../common/utils/math-helper';

const controlsInitValues = {
  [shadersDataTypes.INT]: 1,
  [shadersDataTypes.FLOAT]: 0.1,
  [shadersDataTypes.BOOL]: false,
  [shadersDataTypes.VEC2]: [1, 1],
  [shadersDataTypes.VEC3]: [1, 1, 1],
  [shadersDataTypes.VEC4]: [1, 1, 1, 1],
  [shadersDataTypes.MAT2]: matrices.mat2,
  [shadersDataTypes.MAT3]: matrices.mat3,
  [shadersDataTypes.MAT4]: matrices.mat4,
  [shadersDataTypes.SAMPLER2D]: ''
};

export default controlsInitValues;

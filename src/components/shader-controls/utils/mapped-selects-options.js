import shadersDataTypes, { basic, vectors, matrices, texture } from '../../../common/constants/shaders-data-types';
import { createSelectOptions } from '../../../common/utils/base-helper';

const mappedSelectOptions = (dataType) => {
  switch (dataType) {
    case shadersDataTypes.INT:
    case shadersDataTypes.FLOAT:
    case shadersDataTypes.BOOL:
      return createSelectOptions(basic);

    case shadersDataTypes.VEC2:
    case shadersDataTypes.VEC3:
    case shadersDataTypes.VEC4:
      return createSelectOptions(vectors);

    case shadersDataTypes.MAT2:
    case shadersDataTypes.MAT3:
    case shadersDataTypes.MAT4:
      return createSelectOptions(matrices);

    case shadersDataTypes.SAMPLER2D:
      return createSelectOptions(texture);

    default:
      return createSelectOptions(shadersDataTypes);
  }
};

export default mappedSelectOptions;

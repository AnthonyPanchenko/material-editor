import shadersControlsTypes from '../../../common/constants/shaders-controls-types';
import shadersTypes from '../../../common/constants/shaders-types';

const state = {
  isVisibleObjectsList: true,
  isVisibleControlsPanel: true,
  isVisibleControlsFooter: true,
  activeControlsType: shadersControlsTypes.UNIFORMS,
  activeShaderType: shadersTypes.FRAGMENT_SHADER,
  controlsFooterHeight: 30,
  controlsPanelWidth: 42,
  newControls: {
    [shadersTypes.FRAGMENT_SHADER]: {
      [shadersControlsTypes.ATTRIBUTES]: null,
      [shadersControlsTypes.UNIFORMS]: null,
      [shadersControlsTypes.TEXTURES]: null
    },
    [shadersTypes.VERTEX_SHADER]: {
      [shadersControlsTypes.ATTRIBUTES]: null,
      [shadersControlsTypes.UNIFORMS]: null,
      [shadersControlsTypes.TEXTURES]: null
    }
  },
  shaders: {
    uuid: '4cf2cfcd-143c-4aae-852f-39ec2ca981c2',
    name: 'New shader',
    [shadersTypes.FRAGMENT_SHADER]: {
      value: 'uniform float u_time;',
      [shadersControlsTypes.ATTRIBUTES]: [
        {
          uuid: 'b49197bd-e97b-4567-b7d9-b852930722f2',
          value: [0.43, -0.23, 0.56, 0.23, 1, -0.67, 0.2, 0.6, -1],
          name: 'matrix3x3',
          mode: 'matrix',
          dataType: 'mat3'
        },
        {
          uuid: 'ba431408-b660-46b6-b0c0-2245ceac0b55',
          value: 0.16,
          name: 'numberValue',
          mode: 'number',
          dataType: 'float'
        }
      ],
      [shadersControlsTypes.UNIFORMS]: [
        {
          uuid: '643ec621-9587-4c66-8f9c-b77cec0eb37b',
          value: [0.25, 0.78, -0.4],
          name: 'pointVector',
          mode: 'vector',
          dataType: 'vec3'
        },
        {
          uuid: 'e7182e28-10cf-45fe-8b14-da7579a22c14',
          value: [70, 70, 220, 1],
          name: 'bgColor',
          mode: 'color',
          dataType: 'vec4'
        },
        {
          uuid: 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f',
          value: [0.35, -0.53],
          mode: 'vector',
          name: 'positionVector',
          dataType: 'vec2'
        }
      ],
      [shadersControlsTypes.TEXTURES]: [
        {
          uuid: '112c2b71-d8d0-408c-9036-efe0f1549700',
          value: 'https://image.prntscr.com/image/lAsuUdTFQ6uf8YCr3edGTQ.png',
          mode: 'vector',
          name: 'texture_stones',
          dataType: 'sampler2D'
        },
        {
          uuid: '87baca02-2aa3-4c40-b315-7f91b678c4cc',
          value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
          mode: 'texture',
          name: 'texture_wall',
          dataType: 'sampler2D'
        }
      ]
    },
    [shadersTypes.VERTEX_SHADER]: {
      value: 'uniform vec2 u_resolution;',
      [shadersControlsTypes.ATTRIBUTES]: [
        {
          uuid: 'ba431408-b660-46b6-b0c0-2245ceac0b55',
          value: 0.16,
          name: 'numberValue',
          mode: 'number',
          dataType: 'float'
        }
      ],
      [shadersControlsTypes.UNIFORMS]: [
        {
          uuid: 'e7182e28-10cf-45fe-8b14-da7579a22c14',
          value: [70, 70, 220, 1],
          name: 'bgColor',
          mode: 'color',
          dataType: 'vec4'
        },
        {
          uuid: 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f',
          value: [0.35, -0.53],
          mode: 'vector',
          name: 'positionVector',
          dataType: 'vec2'
        }
      ],
      [shadersControlsTypes.TEXTURES]: [
        {
          uuid: '87baca02-2aa3-4c40-b315-7f91b678c4cc',
          value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
          mode: 'texture',
          name: 'texture_wall',
          dataType: 'sampler2D'
        }
      ]
    }
  }
};

export default state;

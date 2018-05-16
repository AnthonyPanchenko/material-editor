import shadersControlsTypes from '../../../common/constants/shaders-controls-types';
import shadersTypes from '../../../common/constants/shaders-types';

const state = {
  materialId: 'jkhsdfgywiou-2354-5436-xdfg4-dsfgdsgsdgfw3e',
  isVisibleControlsFooter: true,
  activeShaderType: shadersTypes.FRAGMENT_SHADER,
  controlsFooterHeight: 35,
  controlsPanelWidth: 42,
  editableControlsIds: [],
  activeControlType: {
    [shadersTypes.FRAGMENT_SHADER]: shadersControlsTypes.UNIFORM,
    [shadersTypes.VERTEX_SHADER]: shadersControlsTypes.UNIFORM
  },
  controlsCopies: {
    [shadersTypes.FRAGMENT_SHADER]: {},
    [shadersTypes.VERTEX_SHADER]: {}
  },
  newControl: {
    [shadersTypes.FRAGMENT_SHADER]: {
      [shadersControlsTypes.ATTRIBUTE]: {},
      [shadersControlsTypes.UNIFORM]: {},
      [shadersControlsTypes.TEXTURE]: {}
    },
    [shadersTypes.VERTEX_SHADER]: {
      [shadersControlsTypes.ATTRIBUTE]: {},
      [shadersControlsTypes.UNIFORM]: {},
      [shadersControlsTypes.TEXTURE]: {}
    }
  },
  shaders: {
    [shadersTypes.FRAGMENT_SHADER]: '',
    [shadersTypes.VERTEX_SHADER]: ''
  },
  controlsIds: {
    [shadersTypes.FRAGMENT_SHADER]: {
      [shadersControlsTypes.ATTRIBUTE]: ['b49197bd-e97b-4567-b7d9-b852930722f2', 'ba431408-b660-46b6-b0c0-2245ceac0b55'],
      [shadersControlsTypes.UNIFORM]: ['643ec621-9587-4c66-8f9c-b77cec0eb37b', 'e7182e28-10cf-45fe-8b14-da7579a22c14', 'cvbcbwe4-234d-dfsf-werwr-234hjkgsdfg34', 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f'],
      [shadersControlsTypes.TEXTURE]: ['112c2b71-d8d0-408c-9036-efe0f1549700', 'sdfsdgfg-23424-252sf-b315-4575dfhgde2']
    },
    [shadersTypes.VERTEX_SHADER]: {
      [shadersControlsTypes.ATTRIBUTE]: ['dxfghty456-xgvf-sdfe-zcv4-asfwer234dgdg'],
      [shadersControlsTypes.UNIFORM]: ['sdfget234-bgdf4-nbm567-asd3-xsdvgvs2141', 'dvbgdbgd53-cvb53-sdf34e5-dfg43-dfgdrtg46543'],
      [shadersControlsTypes.TEXTURE]: ['87baca02-2aa3-4c40-b315-7f91b678c4cc']
    }
  },
  controls: {
    [shadersTypes.FRAGMENT_SHADER]: {
      'b49197bd-e97b-4567-b7d9-b852930722f2': {
        _id: 'b49197bd-e97b-4567-b7d9-b852930722f2',
        value: [0.43, -0.23, 0.56, 0.23, 1, -0.67, 0.2, 0.6, -1],
        name: 'matrix3x3',
        ctrlType: 'attribute',
        mode: 'matrix',
        dataType: 'mat3'
      },
      'ba431408-b660-46b6-b0c0-2245ceac0b55': {
        _id: 'ba431408-b660-46b6-b0c0-2245ceac0b55',
        value: 0.16,
        name: 'numberValue',
        ctrlType: 'attribute',
        mode: 'number',
        dataType: 'float'
      },
      '643ec621-9587-4c66-8f9c-b77cec0eb37b': {
        _id: '643ec621-9587-4c66-8f9c-b77cec0eb37b',
        value: [0.25, 0.78, -0.4],
        name: 'pointVector',
        ctrlType: 'uniform',
        mode: 'vector',
        dataType: 'vec3'
      },
      'e7182e28-10cf-45fe-8b14-da7579a22c14': {
        _id: 'e7182e28-10cf-45fe-8b14-da7579a22c14',
        value: [0.27, 0.27, 0.78],
        name: 'bgColor',
        ctrlType: 'uniform',
        mode: 'color',
        dataType: 'vec3'
      },
      'cvbcbwe4-234d-dfsf-werwr-234hjkgsdfg34': {
        _id: 'cvbcbwe4-234d-dfsf-werwr-234hjkgsdfg34',
        value: [0.27, 0.27, 0.78, 1],
        name: 'dotColor',
        ctrlType: 'uniform',
        mode: 'color',
        dataType: 'vec4'
      },
      'ac67ef7c-2486-4dd2-ae57-4cec4d06719f': {
        _id: 'ac67ef7c-2486-4dd2-ae57-4cec4d06719f',
        value: [0.35, -0.53],
        mode: 'vector',
        name: 'positionVector',
        ctrlType: 'uniform',
        dataType: 'vec2'
      },
      '112c2b71-d8d0-408c-9036-efe0f1549700': {
        _id: '112c2b71-d8d0-408c-9036-efe0f1549700',
        value: 'https://image.prntscr.com/image/lAsuUdTFQ6uf8YCr3edGTQ.png',
        mode: 'texture',
        name: 'texture_stones',
        ctrlType: 'texture',
        dataType: 'sampler2D'
      },
      'sdfsdgfg-23424-252sf-b315-4575dfhgde2': {
        _id: 'sdfsdgfg-23424-252sf-b315-4575dfhgde2',
        value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
        mode: 'texture',
        name: 'texture_wall',
        ctrlType: 'texture',
        dataType: 'sampler2D'
      }
    },
    [shadersTypes.VERTEX_SHADER]: {
      'dxfghty456-xgvf-sdfe-zcv4-asfwer234dgdg': {
        _id: 'dxfghty456-xgvf-sdfe-zcv4-asfwer234dgdg',
        value: 0.16,
        name: 'numberValue',
        ctrlType: 'attribute',
        mode: 'number',
        dataType: 'float'
      },
      'sdfget234-bgdf4-nbm567-asd3-xsdvgvs2141': {
        _id: 'sdfget234-bgdf4-nbm567-asd3-xsdvgvs2141',
        value: [0.27, 0.73, 0.78, 1],
        name: 'bgColor',
        ctrlType: 'uniform',
        mode: 'color',
        dataType: 'vec4'
      },
      'dvbgdbgd53-cvb53-sdf34e5-dfg43-dfgdrtg46543': {
        _id: 'dvbgdbgd53-cvb53-sdf34e5-dfg43-dfgdrtg46543',
        value: [0.35, -0.53],
        mode: 'vector',
        name: 'positionVector',
        ctrlType: 'uniform',
        dataType: 'vec2'
      },
      '87baca02-2aa3-4c40-b315-7f91b678c4cc': {
        _id: '87baca02-2aa3-4c40-b315-7f91b678c4cc',
        value: 'https://image.prntscr.com/image/9bbPbzteR0yUzDm4QzldQw.png',
        mode: 'texture',
        name: 'texture_wall',
        ctrlType: 'texture',
        dataType: 'sampler2D'
      }
    }
  }
};

export default state;

import shadersControlsTypes from '../../../common/constants/shaders-controls-types';
import shadersTypes from '../../../common/constants/shaders-types';

const state = {
  glslProgramsList: [],
  selectedGlslprogram: null,

  isVisibleObjectsList: true,
  isVisibleControlsPanel: true,
  isVisibleControlsFooter: true,
  activeControlsType: shadersControlsTypes.UNIFORMS,
  activeShaderType: shadersTypes.FRAGMENT_SHADER,
  controlsFooterHeight: 30,
  controlsPanelWidth: 42,
  shadersInfo: null,
  shaders: {
    [shadersTypes.FRAGMENT_SHADER]: '',
    [shadersTypes.VERTEX_SHADER]: ''
  },
  controls: {
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
  }
};

export default state;

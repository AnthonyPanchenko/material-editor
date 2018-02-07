import shadersControlsTypes from '../../../common/constants/shaders-controls-types';
import shadersTypes from '../../../common/constants/shaders-types';

const state = {
  isVisibleObjectsList: true,
  isVisibleControlsPanel: true,
  isVisibleControlsFooter: false,
  isOpenGlslProgramsWindow: false,
  activeControlsType: shadersControlsTypes.UNIFORMS,
  activeShaderType: shadersTypes.FRAGMENT_SHADER,
  controlsFooterHeight: 30,
  controlsPanelWidth: 42,
  glslProgram: null,
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
  }
};

export default state;

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
  shadersInfo: null,
  shadersValues: {
    [shadersTypes.FRAGMENT_SHADER]: '',
    [shadersTypes.VERTEX_SHADER]: ''
  },
  shadersControls: {
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

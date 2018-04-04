import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_LIGHTING_EDITOR](state, width) {
    state.controlsPanelWidth = width;
  }
};

export default mutations;

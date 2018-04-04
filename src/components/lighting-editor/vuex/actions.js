import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetControlsPanelWidth(context, width) {
    context.commit(mutationTypes.SET_PANEL_CONTROLS_WIDTH_OF_LIGHTING_EDITOR, width);
  }
};

export default actions;

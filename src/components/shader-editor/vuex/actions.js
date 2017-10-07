import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.SHADER_EDITOR_SET_CTRL_BOX_WIDTH, width);
  },
};

export default actions;

import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.MATERIAL_EDITOR_SET_CTRL_BOX_WIDTH, width);
  },
};

export default actions;

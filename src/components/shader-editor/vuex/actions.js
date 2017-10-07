import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.SET_CTRL_BOX_WIDTH, width);
  },
  onToggleSideBar(context) {
    context.commit(mutationTypes.SHOW_HIDE_SIDEBAR);
  },
};

export default actions;

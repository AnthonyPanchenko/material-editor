import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onSetCtrlBoxWidth(context, width) {
    context.commit(mutationTypes.SET_CTRL_BOX_WIDTH, width);
  },
  onToggleObjectsList(context) {
    context.commit(mutationTypes.SHOW_HIDE_OBJECTS_LIST);
  },
};

export default actions;

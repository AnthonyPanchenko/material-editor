import mutationTypes from '../../../common/constants/mutation-types';

const actions = {
  onToggleFooterContent(context) {
    context.commit(mutationTypes.TOGGLE_FOOTER_CONTENT);
  },
  onSetActiveTabName(context, activeTabName) {
    context.commit(mutationTypes.SET_ACTIVE_TAB_NAME, activeTabName);
  },
};

export default actions;

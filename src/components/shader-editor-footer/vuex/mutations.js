import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.TOGGLE_FOOTER_CONTENT](state) {
    state.isVisibleFooterContent = !state.isVisibleFooterContent;
  },
  [mutationTypes.SET_ACTIVE_TAB_NAME](state, activeTabName) {
    state.activeTabName = activeTabName;
  },
};

export default mutations;

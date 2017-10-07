import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_CTRL_BOX_WIDTH](state, width) {
    state.widthCtrlBox = width;
  },
};

export default mutations;

import mutationTypes from '../../../common/constants/mutation-types';

const mutations = {
  [mutationTypes.SET_CTRL_BOX_WIDTH](state, width) {
    state.widthCtrlBox = width;
  },
  [mutationTypes.SHOW_HIDE_OBJECTS_LIST](state) {
    state.isVisibleObjectsList = !state.isVisibleObjectsList;
  },
};

export default mutations;

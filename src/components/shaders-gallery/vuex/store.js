import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const shadersGallery = {
  namespaced: true,
  state: {
    list: [],
    activeShader: null
  },
  actions,
  mutations,
  getters
};

export default shadersGallery;

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shadersGallery');
import * as api from '../../common/constants/api';

export default {
  name: 'ShadersGallery',
  components: {
  },
  data() {
    return {};
  },
  computed: mapState([
    'list'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms']),
    loadGlslProgramsList() {
      this.$http({
        url: api.GLSL_PROGRAMS,
        method: 'GET',
        // credentials: true,
        before: () => {
          console.log('start to run spinner');
        },
      }).then(res => {
        this.onSuccessLoadGlslPrograms(res.body);
      }, res => {
        console.log('error', res);
      });
    }
  },
  updated() {
    this.loadGlslProgramsList();
  }
}
</script>

<template>
  <transition name="slide-down">
    <div>eee</div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shadersGallery');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import noop from '../../common/utils/noop';
import * as api from '../../common/constants/api';

export default {
  name: 'ShadersGallery',
  props: {
    isOpen: { type: Boolean, default: false },
    onClose: { type: Function, default: noop },
    onCreate: { type: Function, default: noop },
    onOpenShadersGallery: { type: Function, default: noop },
  },
  components: {
    CustomBtn,
  },
  data() {
    return {};
  },
  computed: mapState([
    'list'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms']),
    onProgramClick() {
      console.log(111);
    },
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
  <transition name="slide">
    <div v-if="isOpen" class="shader-gallery">
      <div class="header">
        <h4>Shaders gallery</h4>
        <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
      </div>
      <div class="body">

        <figure class="program-item" v-for="program in list" :key="program.uuid" @click="onProgramClick">
          <div v-if="!!program.previewBgUlr" class="bg-image" :style="{ backgroundImage: `url(${program.previewBgUlr})` }" />
          <i v-else class="icon-image" aria-hidden="true" />
          <figcaption class="name">{{ program.name }}</figcaption>
        </figure>

      </div>
      <div class="footer">

      </div>
    </div>
  </transition>
</template>

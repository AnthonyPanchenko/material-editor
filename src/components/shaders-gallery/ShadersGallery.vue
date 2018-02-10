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
    return {
      activeShaderUuid: '476fghb-adb8-wyty-883a-dsg'
    };
  },
  computed: mapState([
    'list'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms']),
    onShaderClick(event) {
      console.log(event.target.dataset.id);
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
    <div v-if="isOpen" class="shaders-gallery-container">
      <div class="header controls-row">
        <h5 class="title">Shaders gallery</h5>
        <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
      </div>
      <div class="body">

        <ul class="shaders-list scroll-box">
          <li v-for="shader in list" :key="shader.uuid">
            <figure :class="['shader-item', { 'active': activeShaderUuid === shader.uuid }]" @click="onShaderClick">
              <div v-if="!!shader.previewBgUlr" class="bg-image" :style="{ backgroundImage: `url(${shader.previewBgUlr})` }" />
              <div v-else class="no-bg">
                <i class="icon-image" aria-hidden="true" />
              </div>
              <figcaption class="name">{{ shader.name }}</figcaption>
            </figure>
          </li>
        </ul>

      </div>
      <div class="footer">

      </div>
    </div>
  </transition>
</template>

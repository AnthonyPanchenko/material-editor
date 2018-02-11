<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shadersGallery');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import emptyObject from '../../common/utils/emptyObject';
import ShaderItem from './components/ShaderItem.vue';
import noop from '../../common/utils/noop';
import * as api from '../../common/constants/api';

export default {
  name: 'ShadersGallery',
  props: {
    isOpen: { type: Boolean, default: false },
    onClose: { type: Function, default: noop },
    onCreate: { type: Function, default: noop },
    activeShader: { type: Object, default: emptyObject }
  },
  components: {
    InputText,
    ShaderItem,
    CustomBtn
  },
  data() {
    return {
      isVisibleRemoveShaderCtrls: false
    };
  },
  computed: mapState([
    'list'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms']),
    onShaderClick(shader) {
      console.log(shader);
    },
    onRemoveShader() {
      this.isVisibleRemoveShaderCtrls = true;
    },
    onCancelRemoveShader() {
      this.isVisibleRemoveShaderCtrls = false;
    },
    onAgreeRemoveShader() {
      this.isVisibleRemoveShaderCtrls = false;
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
      <div class="shaders-container">
        <div class="header controls-row">
          <h5 class="title">Shaders gallery</h5>
          <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
        </div>
        <div class="body">

          <ul class="shaders-list scroll-box">
            <li v-for="shader in list" :key="shader.uuid">
              <shader-item :shader="shader" :isActive="activeShader.uuid === shader.uuid" :onClick="onShaderClick" />
            </li>
          </ul>

        </div>
        <div class="footer controls-row">
          <custom-btn v-if="!isVisibleRemoveShaderCtrls" iconClass="icon-trash-bin" :onClick="onRemoveShader" class="danger xs" />
          <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-checkmark" :onClick="onAgreeRemoveShader" class="success xs" />
          <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-close" :onClick="onCancelRemoveShader" class="danger xs" />

          <input-text />
          <custom-btn title="Apply / Edit" class="primary" />
        </div>
      </div>

      <div class="preview-container">
        <div class="header controls-row">
          <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
        </div>
        <div class="body">

        </div>
        <div class="footer controls-row">

        </div>
      </div>
    </div>
  </transition>
</template>

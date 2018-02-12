<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shadersGallery');
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import CanvasSection from '../canvas-section/CanvasSection.vue';
import emptyObject from '../../common/utils/emptyObject';
import ShaderItem from './components/ShaderItem.vue';
import noop from '../../common/utils/noop';
import * as api from '../../common/constants/api';

export default {
  name: 'ShadersGallery',
  props: {
    isEditable: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    onClose: { type: Function, default: noop },
    onApply: { type: Function, default: noop },
    onEdit: { type: Function, default: noop }
  },
  components: {
    InputText,
    ShaderItem,
    CanvasSection,
    CustomBtn
  },
  data() {
    return {
      newShaderName: '',
      isVisibleRemoveShaderCtrls: false
    };
  },
  computed: mapState([
    'list',
    'activeShader'
  ]),
  methods: {
    ...mapActions(['onSuccessLoadGlslPrograms', 'onSetActiveShader']),
    onShaderClick(shader) {
      this.onSetActiveShader(shader);
      this.newShaderName = shader.name;
      this.isVisibleRemoveShaderCtrls = false;
    },
    onRenameShader() {
      if ((this.newShaderName && (this.activeShader && this.activeShader.name)) !== this.newShaderName.trim()) {
        console.log(this.newShaderName.trim());
      }
    },
    onChangeShaderName(str) {
      this.newShaderName = str;
    },
    onRemoveShader() {
      this.newShaderName = this.activeShader.name;
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
    <div v-if="isOpen" class="base-layout shaders-gallery">
      <section class="container controls-section">
        <div class="header controls-row">
          <h5 class="title">Shaders gallery</h5>
          <custom-btn iconClass="icon-close" :onClick="onClose" class="danger xs" />
        </div>

        <div class="body">
          <ul class="shaders-list scroll-box">
            <li v-for="shader in list" :key="shader.uuid">
              <shader-item :shader="shader" :isActive="activeShader && (activeShader.uuid === shader.uuid)" :onClick="onShaderClick" />
            </li>
          </ul>
        </div>

        <div v-if="activeShader" class="footer controls-row">
          <custom-btn v-if="!isVisibleRemoveShaderCtrls" iconClass="icon-trash-bin" :onClick="onRemoveShader" class="danger xs" />
          <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-checkmark" :onClick="onAgreeRemoveShader" class="success xs" />
          <custom-btn v-if="isVisibleRemoveShaderCtrls" iconClass="icon-close" :onClick="onCancelRemoveShader" class="danger xs" />
          <input-text :value="newShaderName" :onInput="onChangeShaderName" />
          <custom-btn :disabled="!newShaderName" title="Rename" :onClick="onRenameShader" class="success sm" />
          <custom-btn v-if="isEditable" title="Edit" :onClick="onEdit" class="primary sm" />
          <custom-btn v-else title="Apply" :onClick="onApply" class="primary sm" />
        </div>

        <div v-else class="footer controls-row" />
      </section>

      <canvas-section :isInFullScreenMode="isVisibleControlsPanel" :onToggleFullScreenMode="onToggleFullScreenMode">
        <div slot="header" class="header controls-row">
          <custom-btn iconClass="icon-sphere" />
          <custom-btn iconClass="icon-cube" />
          <custom-btn iconClass="icon-cylinder" />
          <custom-btn iconClass="icon-torus" />
          <custom-btn iconClass="icon-plane" />
        </div>
      </canvas-section>
    </div>
  </transition>
</template>

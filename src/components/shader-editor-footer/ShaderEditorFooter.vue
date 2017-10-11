<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import ResizeBox from '../resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ShaderEditorFooter',
  components: {
    CustomBtn,
    ResizeBox,
  },
  computed: mapState(['isVisibleFooterContent', 'activeTabName', 'footerHeight']),
  methods: mapActions(['onToggleFooterContent', 'onSetActiveTabName', 'onSetFooterHeight']),
}
</script>

<template>
  <resize-box tag="footer" resize="row" :onEndOfResize="onSetFooterHeight" :size="footerHeight" customClass="controls-footer shader-editor-footer">
    <div class="controls-row">
      <custom-btn title="Attributes" disabled />
      <custom-btn title="Uniforms" iconClass="icon-plus" customClass="ctrl-btn-default active" />
      <custom-btn title="Textures" />
      <custom-btn iconClass="icon-expand-vertical" customClass="ctrl-btn-default xs" />
    </div>
    <transition name="footer-content">
      <div v-if="isVisibleFooterContent" class="shader-ctrl-settings">
        footer content
      </div>
    </transition>
  </resize-box>
</template>

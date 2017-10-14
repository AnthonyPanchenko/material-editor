<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import ResizeBox from '../resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import InputBtn from '../../common/components/input-btn/InputBtn.vue';
import tabNames from './constants/tabNames';

export default {
  name: 'ShaderEditorFooter',
  data() {
    return {
      tabNames,
    }
  },
  components: {
    InputBtn,
    CustomBtn,
    ResizeBox,
  },
  computed: mapState(['isVisibleFooterContent', 'activeTabName', 'footerHeight']),
  methods: {
    ...mapActions(['onToggleFooterContent', 'onSetActiveTabName', 'onSetFooterHeight']),
    defineIconClass(tabName) {
      return (this.activeTabName === tabName) && this.isVisibleFooterContent ? 'icon-plus' : '';
    },
    defineCustomClass(tabName) {
      return (this.activeTabName === tabName) && this.isVisibleFooterContent ? 'ctrl-btn-default active' : 'ctrl-btn-default';
    },
    onChangeCheckBox(event) {
      console.log(event.target.checked);
    },
    onTabClick(event) {
      if (event.target.dataset.tab === this.activeTabName) {
        console.log('create new setting');
      } else {
        this.onSetActiveTabName(event.target.dataset.tab);
      }
    },
  },
}
</script>

<template>
  <resize-box tag="footer" resize="row" :onEndOfResize="onSetFooterHeight" :size="footerHeight" customClass="controls-footer shader-editor-footer" :disabled="!isVisibleFooterContent">
    <div class="controls-row">
      <custom-btn title="Attributes" :iconClass="defineIconClass(tabNames.ATTRIBUTES)" :customClass="defineCustomClass(tabNames.ATTRIBUTES)" :disabled="!isVisibleFooterContent" :data-tab="tabNames.ATTRIBUTES" :onCustomClick="onTabClick" />
      <custom-btn title="Uniforms" :iconClass="defineIconClass(tabNames.UNIFORMS)" :customClass="defineCustomClass(tabNames.UNIFORMS)" :disabled="!isVisibleFooterContent" :data-tab="tabNames.UNIFORMS" :onCustomClick="onTabClick" />
      <custom-btn title="Textures" :iconClass="defineIconClass(tabNames.TEXTURES)" :customClass="defineCustomClass(tabNames.TEXTURES)" :disabled="!isVisibleFooterContent" :data-tab="tabNames.TEXTURES" :onCustomClick="onTabClick" />
      <custom-btn :iconClass="isVisibleFooterContent ? 'icon-collapse-vertical' : 'icon-expand-vertical'" customClass="ctrl-btn-default xs" :onCustomClick="onToggleFooterContent" />
    </div>
    <div v-if="isVisibleFooterContent" class="shader-ctrl-settings">
      <input-btn type="checkbox" titleStart="Some checkbox" :onChange="onChangeCheckBox" disabled />
      <br />
      <br />
      <hr />
      <br />
      <input-btn type="radio" name="name1" titleEnd="Some radio" value="value1" :onChange="onChangeCheckBox" checked />
      <br />
      <input-btn type="radio" name="name1" titleEnd="Some radio" value="value2" :onChange="onChangeCheckBox" disabled />
      <br />
      <input-btn type="radio" name="name1" titleEnd="Some radio" value="value3" :onChange="onChangeCheckBox" />
    </div>
  </resize-box>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import ResizeBox from '../resize-box/ResizeBox.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import RadioBtn from '../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';
import tabNames from './constants/tabNames';

export default {
  name: 'ShaderEditorFooter',
  data() {
    return {
      tabNames,
      options: [
        { title: 'One', id: 'aaa' },
        { title: 'Two', id: 'bbb' },
        { title: 'Three', id: 'ccc' },
      ],
    }
  },
  components: {
    CustomSelect,
    CheckboxBtn,
    RadioBtn,
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
    onChangeCheckBox(state, value, name) {
      console.log(state);
      console.log(value);
      console.log(name);
    },
    onChangeRadioBtn(pickedValue, name) {
      console.log(pickedValue);
      console.log(name);
    },
    onChangeSelect(selectedValue, name) {
      console.log(selectedValue);
      console.log(name);
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
      <checkbox-btn label="Some checkbox" name="n2ame31" value="value1" :onChange="onChangeCheckBox" />
      <br />
      <hr />
      <br />
      <radio-btn name="name1" label="Some radio" value="value1" :onChange="onChangeRadioBtn" picked="value1" />
      <br />
      <radio-btn name="name1" label="Some radio" value="value2" :onChange="onChangeRadioBtn" picked="value1" disabled />
      <br />
      <radio-btn name="name1" label="Some radio" value="value3" :onChange="onChangeRadioBtn" picked="value1" />
      <br />
      <custom-select :options="options" name="selectname" :onChange="onChangeSelect" />
    </div>
  </resize-box>
</template>

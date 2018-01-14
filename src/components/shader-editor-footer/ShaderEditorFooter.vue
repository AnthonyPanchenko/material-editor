<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import InputText from '../../common/components/input-text/InputText.vue';
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
        { title: 'int', id: 'int' },
        { title: 'float', id: 'float' },
        { title: 'vec2', id: 'vec2' },
        { title: 'vec3', id: 'vec3' },
        { title: 'vec4', id: 'vec4' }
      ]
    };
  },
  components: {
    CustomSelect,
    CheckboxBtn,
    InputNumber,
    InputText,
    RadioBtn,
    CustomBtn,
    ResizeBox
  },
  computed: mapState([
    'isVisibleFooterContent',
    'activeTabName',
    'footerHeight'
  ]),
  methods: {
    ...mapActions([
      'onToggleFooterContent',
      'onSetActiveTabName',
      'onSetFooterHeight'
    ]),
    defineIconClass(tabName) {
      return this.activeTabName === tabName && this.isVisibleFooterContent ? 'icon-plus' : '';
    },
    isActive(tabName) {
      return this.activeTabName === tabName && this.isVisibleFooterContent;
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
    onTabClick(tabName) {
      if (tabName === this.activeTabName) {
        console.log('create new setting');
      } else {
        this.onSetActiveTabName(tabName);
      }
    }
  }
};
</script>

<template>
  <resize-box tag="footer" resize="row" :onEndOfResize="onSetFooterHeight" :size="footerHeight" class="controls-footer shader-editor-footer" :disabled="!isVisibleFooterContent">
    <div class="controls-row">
      <custom-btn accesskey="a" title="Attributes" :iconClass="defineIconClass(tabNames.ATTRIBUTES)" :active="isActive(tabNames.ATTRIBUTES)" :disabled="!isVisibleFooterContent" :data="tabNames.ATTRIBUTES" :onClick="onTabClick" />
      <custom-btn accesskey="u" title="Uniforms" :iconClass="defineIconClass(tabNames.UNIFORMS)" :active="isActive(tabNames.UNIFORMS)" :disabled="!isVisibleFooterContent" :data="tabNames.UNIFORMS" :onClick="onTabClick" />
      <custom-btn accesskey="t" title="Textures" :iconClass="defineIconClass(tabNames.TEXTURES)" :active="isActive(tabNames.TEXTURES)" :disabled="!isVisibleFooterContent" :data="tabNames.TEXTURES" :onClick="onTabClick" />
      <custom-btn accesskey="c" :iconClass="isVisibleFooterContent ? 'icon-collapse-vertical' : 'icon-expand-vertical'" class="xs" :onClick="onToggleFooterContent" />
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.ATTRIBUTES" class="shader-ctrl-settings">
        tabNames.ATTRIBUTES
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.UNIFORMS" class="shader-ctrl-settings">
      <div class="create-new">
        <div class="settings-row">
          <custom-select :options="options" selected="vec3" name="selectname" :onChange="onChangeSelect" />
          <radio-btn name="colorvector" sufix="color" value="color" :onChange="onChangeRadioBtn" picked="color" />
          <radio-btn name="colorvector" sufix="vector" value="vector" :onChange="onChangeRadioBtn" picked="color" />
          <input-text name="tex" placeholder="name" />
          <custom-btn iconClass="icon-checkmark" class="success xs" />
          <custom-btn iconClass="icon-close" class="danger xs" />
        </div>
        <div class="parameters-row">
          <input-number prefix="R:" />
          <input-number prefix="G:" />
          <input-number prefix="B:" />
        </div>
      </div>
      <div class="controls scroll-box">
        <div class="row">
          <div class="info">
            <span class="name">paintColor</span>
            <span class="type">vec3</span>
          </div>
          <input-number prefix="R:" />
          <input-number prefix="G:" />
          <input-number prefix="B:" />
          <custom-btn iconClass="icon-color-palette" class="xs" />
          <custom-btn iconClass="icon-pencil" class="secondary xs" />
          <custom-btn iconClass="icon-trash-bin" class="danger xs" />
        </div>
        <div class="row">
          <div class="info">
            <span class="name">lightPosition</span>
            <span class="type">vec3</span>
          </div>
          <input-number prefix="X:" />
          <input-number prefix="Y:" />
          <input-number prefix="Z:" />
          <custom-btn iconClass="icon-xyz" class="xs" />
          <custom-btn iconClass="icon-pencil" class="secondary xs" />
          <custom-btn iconClass="icon-trash-bin" class="danger xs" />
        </div>
      </div>
    </div>

    <div v-if="isVisibleFooterContent && activeTabName === tabNames.TEXTURES" class="shader-ctrl-settings">
        tabNames.TEXTURES
    </div>

  </resize-box>
</template>

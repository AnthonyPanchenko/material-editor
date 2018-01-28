<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('shaderEditorFooter');

import Popover from '../../common/components/popover/Popover.vue';
import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';
import ColorPicker from '../../common/components/color-picker/ColorPicker.vue';
import Vec3Picker from '../../common/components/vec3-picker/Vec3Picker.vue';
import Vec2Picker from '../../common/components/vec2-picker/Vec2Picker.vue';

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
      numberPickerPopoverRef: null,
      vec2PickerPopoverRef: null,
      vec3PickerPopoverRef: null,
      colorPickerPopoverRef: null,
      isOpenNumberPickerPopover: false,
      isOpenVec2PickerPopover: false,
      isOpenVec3PickerPopover: false,
      isOpenColorPickerPopover: false,
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
    Popover,
    NumberPicker,
    Vec3Picker,
    Vec2Picker,
    ColorPicker,
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

    onCloseNumberPickerPopover() {
      if (this.isOpenNumberPickerPopover) {
        this.isOpenNumberPickerPopover = false;
      }
    },

    onToggleNumberPickerPopover() {
      this.numberPickerPopoverRef = this.$refs.numberPickerPopoverRef.$el;
      this.isOpenNumberPickerPopover = !this.isOpenNumberPickerPopover;
    },

    onCloseVec2PickerPopover() {
      if (this.isOpenVec2PickerPopover) {
        this.isOpenVec2PickerPopover = false;
      }
    },

    onToggleVec2PickerPopover() {
      this.vec2PickerPopoverRef = this.$refs.vec2PickerPopoverRef.$el;
      this.isOpenVec2PickerPopover = !this.isOpenVec2PickerPopover;
    },

    onCloseVec3PickerPopover() {
      if (this.isOpenVec3PickerPopover) {
        this.isOpenVec3PickerPopover = false;
      }
    },

    onToggleVec3PickerPopover() {
      this.vec3PickerPopoverRef = this.$refs.vec3PickerPopoverRef.$el;
      this.isOpenVec3PickerPopover = !this.isOpenVec3PickerPopover;
    },

    onCloseColorPickerPopover() {
      if (this.isOpenColorPickerPopover) {
        this.isOpenColorPickerPopover = false;
      }
    },

    onToggleColorPickerPopover() {
      this.colorPickerPopoverRef = this.$refs.colorPickerPopoverRef.$el;
      this.isOpenColorPickerPopover = !this.isOpenColorPickerPopover;
    },

    onChangeVec3Picker(x, y, z, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('vec2 z > ', z);
      console.log('name > ', name);
    },

    onChangeNumberPicker(value, name, min, max, step) {
      console.clear();
      console.log('value > ', value);
      console.log('name > ', name);
      console.log('min > ', min);
      console.log('max > ', max);
      console.log('step > ', step);
    },

    onChangeVec2Picker(x, y, name) {
      console.clear();
      console.log('vec2 x > ', x);
      console.log('vec2 y > ', y);
      console.log('name > ', name);
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
          <custom-select :options="options" selectedOptionId="vec3" name="selectname" :onChange="onChangeSelect" />
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

          <popover :isOpen="isOpenColorPickerPopover" :trigger="colorPickerPopoverRef" :onClose="onCloseColorPickerPopover">
            <color-picker />
          </popover>

          <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerPopoverRef" :onClick="onToggleColorPickerPopover" />

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

          <popover :isOpen="isOpenVec3PickerPopover" :trigger="vec3PickerPopoverRef" :onClose="onCloseVec3PickerPopover">
            <vec3-picker :onChange="onChangeVec3Picker" />
          </popover>

          <custom-btn iconClass="icon-xyz" class="xs" ref="vec3PickerPopoverRef" :onClick="onToggleVec3PickerPopover" />
          <custom-btn iconClass="icon-pencil" class="secondary xs" />
          <custom-btn iconClass="icon-trash-bin" class="danger xs" />
        </div>

        <div class="row">
          <div class="info">
            <span class="name">position</span>
            <span class="type">vec2</span>
          </div>
          <input-number prefix="X:" />
          <input-number prefix="Y:" />

          <popover :isOpen="isOpenVec2PickerPopover" :trigger="vec2PickerPopoverRef" :onClose="onCloseVec2PickerPopover">
            <vec2-picker :vector="[0.3, -0.5]" :onChange="onChangeVec2Picker" />
          </popover>

          <custom-btn iconClass="icon-xy" class="xs" ref="vec2PickerPopoverRef" :onClick="onToggleVec2PickerPopover" />
          <custom-btn iconClass="icon-pencil" class="secondary xs" />
          <custom-btn iconClass="icon-trash-bin" class="danger xs" />
        </div>

        <div class="row">
          <div class="info">
            <span class="name">duration</span>
            <span class="type">float</span>
          </div>
          <input-number ref="numberPickerPopoverRef" :onClick="onToggleNumberPickerPopover" />

          <popover :isOpen="isOpenNumberPickerPopover" :trigger="numberPickerPopoverRef" :onClose="onCloseNumberPickerPopover">
            <number-picker :value="0.3" :step="0.1" :min="-5" :max="5" :onChange="onChangeNumberPicker" />
          </popover>

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

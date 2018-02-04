<script>
import noop from '../../common/utils/noop';
import Popover from '../../common/components/popover/Popover.vue';
import NumberPicker from '../../common/components/number-picker/NumberPicker.vue';
import ResizeBox from '../../common/components/resize-box/ResizeBox.vue';
import InputNumber from '../../common/components/input-number/InputNumber.vue';
import InputText from '../../common/components/input-text/InputText.vue';
import CustomBtn from '../../common/components/custom-btn/CustomBtn.vue';
import CheckboxBtn from '../../common/components/checkbox-btn/CheckboxBtn.vue';
import RadioBtn from '../../common/components/radio-btn/RadioBtn.vue';
import CustomSelect from '../../common/components/custom-select/CustomSelect.vue';

import shadersControlsTypes from '../../common/constants/shaders-controls-types';

export default {
  name: 'ShaderControls',
  props: {
    controlsFooterHeight: { type: Number, default: 32 },
    isVisibleControlsFooter: { type: Boolean, default: true },
    onToggleFooterControls: { type: Function, default: noop },
    onSetFooterControlsHeight: { type: Function, default: noop },
    onSetActiveControlsType: { type: Function, default: noop },
    activeControlsType: { type: String, default: shadersControlsTypes.UNIFORMS }
  },
  components: {
    Popover,
    NumberPicker,
    CustomSelect,
    CheckboxBtn,
    InputNumber,
    InputText,
    RadioBtn,
    CustomBtn,
    ResizeBox
  },
  data() {
    return {
      shadersControlsTypes,
    };
  },
  methods: {
    isActive(controlType) {
      return this.activeControlsType === controlType && this.isVisibleControlsFooter;
    },
    getIconClass(controlType) {
      return this.isActive(controlType) ? 'icon-plus' : '';
    },
    onTabClick(controlType) {
      if (controlType === this.activeControlsType) {
        console.log('create new setting');
      } else {
        this.onSetActiveControlsType(controlType);
      }
    }
  }
};
</script>

<template>
  <resize-box tag="footer" resize="row" :onEndOfResize="onSetFooterControlsHeight" :size="controlsFooterHeight" class="controls-footer shader-controls" :disabled="!isVisibleControlsFooter">
    <div class="controls-row">
      <custom-btn accesskey="a" title="Attributes" :iconClass="getIconClass(shadersControlsTypes.ATTRIBUTES)" :active="isActive(shadersControlsTypes.ATTRIBUTES)" :disabled="!isVisibleControlsFooter" :data="shadersControlsTypes.ATTRIBUTES" :onClick="onTabClick" />
      <custom-btn accesskey="u" title="Uniforms" :iconClass="getIconClass(shadersControlsTypes.UNIFORMS)" :active="isActive(shadersControlsTypes.UNIFORMS)" :disabled="!isVisibleControlsFooter" :data="shadersControlsTypes.UNIFORMS" :onClick="onTabClick" />
      <custom-btn accesskey="t" title="Textures" :iconClass="getIconClass(shadersControlsTypes.TEXTURES)" :active="isActive(shadersControlsTypes.TEXTURES)" :disabled="!isVisibleControlsFooter" :data="shadersControlsTypes.TEXTURES" :onClick="onTabClick" />
      <custom-btn accesskey="c" :iconClass="isVisibleControlsFooter ? 'icon-collapse-vertical' : 'icon-expand-vertical'" class="xs" :onClick="onToggleFooterControls" />
    </div>

    <div v-if="isVisibleControlsFooter && activeControlsType === shadersControlsTypes.ATTRIBUTES" class="shader-ctrl-settings">
      shadersControlsTypes.ATTRIBUTES
      <div class="controls scroll-box">

      </div>
    </div>

    <div v-if="isVisibleControlsFooter && activeControlsType === shadersControlsTypes.UNIFORMS" class="shader-ctrl-settings">
      shadersControlsTypes.UNIFORMS
      <div class="controls scroll-box">

      </div>
    </div>

    <div v-if="isVisibleControlsFooter && activeControlsType === shadersControlsTypes.TEXTURES" class="shader-ctrl-settings">
      shadersControlsTypes.TEXTURES
      <div class="controls scroll-box">

      </div>
    </div>

  </resize-box>
</template>

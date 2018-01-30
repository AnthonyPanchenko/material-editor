<script>
import Info from './Info.vue';
import Popover from '../../../common/components/popover/Popover.vue';
import NumberPicker from '../../../common/components/number-picker/NumberPicker.vue';
import ColorPicker from '../../../common/components/color-picker/ColorPicker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ColorRow',
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    Info,
    Popover,
    NumberPicker,
    ColorPicker,
    InputNumber,
    CustomBtn
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" />

    <input-number prefix="R" name="r" :value="rgb.r" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="G" name="g" :value="rgb.g" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="B" name="b" :value="rgb.b" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="A" name="a" :value="rgb.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />

    <popover :isOpen="isOpenColorPickerPopover" :trigger="colorPickerPopoverRef" :onClose="onCloseColorPickerPopover">
      <color-picker />
    </popover>

    <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerPopoverRef" :onClick="onToggleColorPickerPopover" />
    <custom-btn iconClass="icon-pencil" class="secondary xs" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" />
  </div>
</template>

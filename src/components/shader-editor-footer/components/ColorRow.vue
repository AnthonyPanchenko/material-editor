<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import Popover from '../../../common/components/popover/Popover.vue';
import ColorPicker from '../../../common/components/color-picker/ColorPicker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'ColorRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    color: { type: Object, default: () => ({ r: 70, g: 70, b: 220, a: 1 }) }
  },
  components: {
    Info,
    Popover,
    ColorPicker,
    InputNumber,
    CustomBtn
  },
  data() {
    return {
      isOpen: false,
      colorPickerTrigger: null,
    };
  },
  methods: {
    onClosePopover() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
    onToggleColorPickerPopover() {
      this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
      this.isOpen = !this.isOpen;
    },
    onInputRgbValue(value, channel) {
      this.onChange({ ...this.color, [channel]: value }, this.name);
    },
    onInputAlphaValue(value) {
      this.onChange({ ...this.color, a: value }, this.name);
    },
    onChangeColorPicker(color) {
      this.onChange(color, this.name);
    }
  },
  mounted() {
    this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="isEditable" />

    <input-number prefix="R" name="r" :value="color.r" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="G" name="g" :value="color.g" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="B" name="b" :value="color.b" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
    <input-number prefix="A" name="a" :value="color.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" v-if="type === 'vec4'" />

    <popover :isOpen="isOpen" :trigger="colorPickerTrigger" :onClose="onClosePopover">
      <color-picker :onChange="onChangeColorPicker" :color="color" />
    </popover>

    <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerTrigger" :onClick="onToggleColorPickerPopover" />
    <custom-btn iconClass="icon-pencil" class="secondary xs" :onClick="onEdit" v-if="isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onRemove" v-if="isEditable" />
  </div>
</template>

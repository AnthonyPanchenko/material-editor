<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number prefix="R:" :name="0" :value="color[0]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="G:" :name="1" :value="color[1]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="B:" :name="2" :value="color[2]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="A:" :name="3" :value="color[3]" :min="0" :max="1" :step="0.01" :onInput="onInputColorValue" v-if="type === 'vec4'" />

    <popover v-if="isOpen" :trigger="colorPickerTrigger" :onClose="onClosePopover">
      <color-picker name="value" :color="color" :onChange="onChangeColorPicker" />
    </popover>

    <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerTrigger" :onClick="onToggleColorPickerPopover" />

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="id" :onClick="onEdit" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-checkmark" class="success xs" :data="id" :onClick="onRemove" v-if="!isEditable && isVisibleRemoveControl" />
    <custom-btn iconClass="icon-close" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && isVisibleRemoveControl" />
  </div>
</template>

<script>
import Info from './Info.vue';
import { noop } from '../../../common/utils/base-helper';
import { colorToNormalizedVector, normalizedVectorToColor } from '../../../common/utils/color-converters';
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

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'vec4' },
    value: { type: Array, default: () => [0.27, 0.27, 0.78, 1] }
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
      color: [255, 255, 255, 1],
      isOpen: false,
      isVisibleRemoveControl: false,
      colorPickerTrigger: null
    };
  },
  watch: {
    value(nextValue) {
      this.color = normalizedVectorToColor(nextValue);
    }
  },
  methods: {
    onChangeColorPicker(rgba) {
      this.onChange(colorToNormalizedVector(rgba, this.type), 'value');
    },
    onTogleRemoveMode() {
      this.isVisibleRemoveControl = !this.isVisibleRemoveControl;
    },
    onClosePopover() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
    onToggleColorPickerPopover() {
      this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
      this.isOpen = !this.isOpen;
    },
    onInputColorValue(color, channel) {
      const rgba = [...this.color];
      rgba[channel] = color;

      this.onChange(colorToNormalizedVector(rgba, this.type), 'value');
    }
  },
  mounted() {
    this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
    this.color = normalizedVectorToColor(this.value);
  }
};
</script>

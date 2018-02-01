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
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '_color' },
    type: { type: String, default: 'vec4' },
    color: { type: Array, default: () => [70, 70, 220, 1] }
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
    onInputColorValue(value, channel) {
      const rgba = [...this.color];
      rgba[channel] = value;

      this.onChange(rgba, this.name);
    },
  },
  mounted() {
    this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number prefix="R" :name="0" :value="color[0]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="G" :name="1" :value="color[1]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="B" :name="2" :value="color[2]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="A" :name="3" :value="color[3]" :min="0" :max="1" :step="0.01" :onInput="onInputColorValue" v-if="type === 'vec4'" />

    <popover :isOpen="isOpen" :trigger="colorPickerTrigger" :onClose="onClosePopover">
      <color-picker :name="uuid" :color="color" :onChange="onChange" />
    </popover>

    <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerTrigger" :onClick="onToggleColorPickerPopover" />
    <custom-btn iconClass="icon-pencil" class="secondary xs" :data="uuid" :onClick="onEdit" v-if="!isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="uuid" :onClick="onRemove" v-if="!isEditable" />
  </div>
</template>

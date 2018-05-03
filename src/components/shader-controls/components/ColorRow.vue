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

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'vec4' },
    value: { type: Array, default: () => [255, 255, 255, 1] }
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
      colorPickerTrigger: null
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
    onInputColorValue(color, channel) {
      const rgba = [...this.value];
      rgba[channel] = color;

      this.onChange(rgba, this.id);
    }
  },
  mounted() {
    this.colorPickerTrigger = this.$refs.colorPickerTrigger.$el;
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number prefix="R" :name="0" :value="value[0]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="G" :name="1" :value="value[1]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="B" :name="2" :value="value[2]" :min="0" :max="255" :step="1" :onInput="onInputColorValue" />
    <input-number prefix="A" :name="3" :value="value[3]" :min="0" :max="1" :step="0.01" :onInput="onInputColorValue" v-if="type === 'vec4'" />

    <popover v-if="isOpen" :trigger="colorPickerTrigger" :onClose="onClosePopover">
      <color-picker :name="id" :color="value" :onChange="onChange" />
    </popover>

    <custom-btn iconClass="icon-color-palette" class="xs" ref="colorPickerTrigger" :onClick="onToggleColorPickerPopover" />
    <custom-btn iconClass="icon-pencil" class="primary xs" :data="_id" :onClick="onEdit" v-if="!isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="_id" :onClick="onRemove" v-if="!isEditable" />
  </div>
</template>

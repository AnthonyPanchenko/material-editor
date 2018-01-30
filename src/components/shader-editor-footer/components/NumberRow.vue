<script>
import Info from './Info.vue';
import noop from '../../../common/utils/noop';
import Popover from '../../../common/components/popover/Popover.vue';
import NumberPicker from '../../../common/components/number-picker/NumberPicker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'NumberRow',
  props: {
    uuid: { type: String, required: true },
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    value: { type: Number, default: 0 }
  },
  components: {
    Info,
    Popover,
    NumberPicker,
    InputNumber,
    CustomBtn
  },
  data() {
    return {
      step: (this.type === 'float') ? 0.01 : 1,
      isOpenNumberPicker: false,
      numberPickerTrigger: null,
    };
  },
  methods: {
    onClosePopover() {
      if (this.isOpenNumberPicker) {
        this.isOpenNumberPicker = false;
      }
    },
    onToggleNumberPickerPopover() {
      this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
      this.isOpenNumberPicker = !this.isOpenNumberPicker;
    },
    onInputNumberValue(value) {
      this.onChange((this.type === 'float') ? value : parseInt(value), this.name);
    },
    onChangeNumberPicker(value) {
      this.onChange(value, this.name);
    }
  },
  mounted() {
    this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
  }
};
</script>

<template>
  <div class="row">
    <info :name="name" :type="type" v-if="isEditable" />

    <input-number :name="name" :value="value" :step="step" :onInput="onInputNumberValue" ref="numberPickerTrigger" :onClick="onToggleNumberPickerPopover" />

    <popover :isOpen="isOpenNumberPicker" :trigger="numberPickerTrigger" :onClose="onClosePopover">
      <number-picker :value="value" :step="step" :onChange="onChangeNumberPicker" :name="name" />
    </popover>

    <custom-btn iconClass="icon-pencil" class="secondary xs" :data="uuid" :onClick="onEdit" v-if="isEditable" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :data="uuid" :onClick="onRemove" v-if="isEditable" />
  </div>
</template>

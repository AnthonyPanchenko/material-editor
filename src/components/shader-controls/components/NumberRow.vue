<template>
  <div class="row">
    <info :name="name" :type="type" v-if="!isEditable" />

    <input-number :value="value" :step="step" :onInput="onInputNumberValue" ref="numberPickerTrigger" :onClick="onToggleNumberPickerPopover" />

    <popover v-if="isOpenNumberPicker" :trigger="numberPickerTrigger" :onClose="onClosePopover">
      <number-picker name="value" :value="value" :step="step" :onChange="onChange" />
    </popover>

    <custom-btn iconClass="icon-pencil" class="primary xs" :data="id" :onClick="onEdit" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-trash-bin" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && !isVisibleRemoveControl" />
    <custom-btn iconClass="icon-checkmark" class="success xs" :data="id" :onClick="onRemove" v-if="!isEditable && isVisibleRemoveControl" />
    <custom-btn iconClass="icon-close" class="danger xs" :onClick="onTogleRemoveMode" v-if="!isEditable && isVisibleRemoveControl" />
  </div>
</template>

<script>
import Info from './Info.vue';
import { noop } from '../../../common/utils/base-helper';
import Popover from '../../../common/components/popover/Popover.vue';
import NumberPicker from '../../../common/components/number-picker/NumberPicker.vue';
import InputNumber from '../../../common/components/input-number/InputNumber.vue';
import CustomBtn from '../../../common/components/custom-btn/CustomBtn.vue';

export default {
  name: 'NumberRow',
  props: {
    isEditable: { type: Boolean, default: false },
    onChange: { type: Function, default: noop },
    onRemove: { type: Function, default: noop },
    onEdit: { type: Function, default: noop },

    id: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: Number, default: 0.1 },
    type: { type: String, default: 'float' }
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
      isVisibleRemoveControl: false,
      step: (this.type === 'float') ? 0.001 : 1,
      isOpenNumberPicker: false,
      numberPickerTrigger: null
    };
  },
  methods: {
    onTogleRemoveMode() {
      this.isVisibleRemoveControl = !this.isVisibleRemoveControl;
    },
    onClosePopover() {
      if (this.isOpenNumberPicker) {
        this.isOpenNumberPicker = false;
      }
    },
    onToggleNumberPickerPopover() {
      this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
      this.isOpenNumberPicker = !this.isOpenNumberPicker;
    },
    onInputNumberValue(num) {
      this.onChange((this.type === 'float') ? num : parseInt(num), 'value');
    }
  },
  mounted() {
    this.numberPickerTrigger = this.$refs.numberPickerTrigger.$el;
  }
};
</script>

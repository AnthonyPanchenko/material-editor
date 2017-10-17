<script>
import noop from '../../utils/noop';

export default {
  name: 'RadioBtn',
  props: {
    name: String,
    value: String,
    label: [String, Number],
    onChange: {
      type: Function,
      default: noop,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    picked: {
      type: [String, Number],
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pickedValue: this.picked,
    }
  },
  methods: {
    onChangeRadioBtn() {
      this.onChange(this.pickedValue, this.name);
    }
  },
}
</script>

<template>
  <label class="radio-btn" :class="`${disabled ? 'disabled' : ''} ${customClass}`">
    <input type="radio" :name="name" v-model="pickedValue" :value="value" @change="onChangeRadioBtn" :disabled="disabled">
    <span class="switch-icon" /> {{ label }}
  </label>
</template>

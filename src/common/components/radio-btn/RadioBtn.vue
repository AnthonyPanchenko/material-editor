<script>
import noop from '../../utils/noop';

export default {
  name: 'RadioBtn',
  props: {
    onChange: {
      type: Function,
      default: noop,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    value: String,
    customClass: String,
    label: [String, Number],
    picked: {
      type: [String, Number],
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
  <label :class="`radio-btn ${disabled ? 'disabled' : ''} ${customClass || ''}`">
    <input type="radio" :name="name" v-model="pickedValue" :value="value" @change="onChangeRadioBtn" :disabled="disabled">
    <span class="switch-icon" />
    {{ label }}
  </label>
</template>

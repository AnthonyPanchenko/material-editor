<script>
import noop from '../../utils/noop';

export default {
  name: 'CheckboxBtn',
  props: {
    onChange: {
      type: Function,
      default: noop,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    value: [String, Number],
    customClass: String,
    label: [String, Number],
  },
  data() {
    return {
      checkedState: this.checked,
    }
  },
  methods: {
    onChangeCheckBox() {
      this.onChange(this.checkedState, this.value, this.name);
    }
  },
}
</script>

<template>
  <label :class="`checkbox-btn ${disabled ? 'disabled' : ''} ${customClass || ''}`">
    {{ label }}
    <input type="checkbox" :name="name" :value="value" @change="onChangeCheckBox" v-model="checkedState" :disabled="disabled">
    <span class="switch-icon" />
  </label>
</template>

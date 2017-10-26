<script>
import noop from "../../utils/noop";

export default {
  name: "CheckboxBtn",
  props: {
    name: String,
    value: [String, Number],
    label: [String, Number],
    onChange: {
      type: Function,
      default: noop
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      checkedState: this.checked
    };
  },
  methods: {
    onChangeCheckBox() {
      this.onChange(this.checkedState, this.value, this.name);
    },
    onPressEnter() {
      this.$refs.checkBox.click();
    }
  }
};
</script>

<template>
  <label class="checkbox-btn" tabindex="0" @keyup.enter="onPressEnter" :class="`${disabled ? 'disabled' : ''} ${customClass}`">
    <span v-if="label" class="str">{{ label }}</span>
    <input type="checkbox" ref="checkBox" :name="name" :value="value" @change="onChangeCheckBox" v-model="checkedState" :disabled="disabled">
    <span class="switch-icon" />
  </label>
</template>

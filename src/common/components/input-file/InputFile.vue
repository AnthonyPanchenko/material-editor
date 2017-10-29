<script>
import noop from "../../utils/noop";

export default {
  name: "InputFile",
  props: {
    name: String,
    value: [String, Number],
    label: [String, Number],
    onChange: {
      type: Function,
      default: noop
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: "image/*"
    }
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    onChangeInputFile(event) {
      if (!this.disabled) {
        this.onChange(this.checkedState, this.value, this.name);
      }
    },
    onPressEnter() {
      this.$refs.inputFile.click();
    }
  }
};
</script>

<template>
  <label class="input-file" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter" :class="`${disabled ? 'disabled' : ''} ${customClass}`">
    {{ label }}
    <input type="file" ref="inputFile" :name="name" @change="onChangeInputFile" :value="value" :disabled="disabled" :multiple="multiple" :accept="accept">
  </label>
</template>

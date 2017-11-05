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
        this.onChange(this.value, this.name);
      }
    },
    onPressEnter() {
      this.$refs.inputFile.click();
    }
  }
};
</script>

<template>
  <label :class="['input-file', { 'disabled': disabled }]" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter">
    {{ label }}
    <input type="file" ref="inputFile" :name="name" @change="onChangeInputFile" :value="value" :disabled="disabled" :multiple="multiple" :accept="accept">
  </label>
</template>

<template>
  <label :class="['input-file', { 'disabled': disabled }]" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter">
    <input type="file" ref="inputFile" :name="name" @change="onChangeInputFile" :value="value" :disabled="disabled" :multiple="multiple" :accept="accept">
    <slot>
      <span class="button">
        <i class="icon-upload" aria-hidden="true" />
      </span>
    </slot>
  </label>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './input-file.scss';

export default {
  name: 'InputFile',
  props: {
    name: String,
    value: { type: String, default: '' },
    onChange: { type: Function, default: noop },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: 'image/*' }
  },
  methods: {
    onChangeInputFile(event) {
      if (!this.disabled) {
        this.onChange(event.target.files, this.name);
      }
    },
    onPressEnter() {
      this.$refs.inputFile.click();
    }
  }
};
</script>

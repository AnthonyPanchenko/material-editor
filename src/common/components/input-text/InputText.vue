<template>
  <label :class="['input-text', { 'disabled': disabled }]" :title="value">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="text" :name="name" v-on:input="onInputText" :placeholder="placeholder" :readonly="readonly" :value="value" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './input-text.scss';

export default {
  name: 'InputText',
  props: {
    name: String,
    value: [String, Number],
    placeholder: [String, Number],
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    onInput: { type: Function, default: noop }
  },
  methods: {
    onInputText(event) {
      if (!this.disabled && !this.readonly) {
        const value = event.target.value.replace(/[^\sA-Za-z0-9-_+\d]/g, '');
        this.onInput(value, this.name);
      }
    }
  }
};
</script>

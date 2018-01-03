<script>
import noop from "../../utils/noop";

export default {
  name: "InputText",
  props: {
    name: String,
    value: [String, Number],
    placeholder: [String, Number],
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    onInput: {
      type: Function,
      default: noop
    }
  },
  methods: {
    onInputText(event) {
      if (!this.disabled) {
        this.onInput(event.target.value, this.name);
      }
    }
  }
};
</script>

<template>
  <label :class="['input-text', { 'disabled': disabled }]" :title="value">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="text" :name="name" v-on:input="onInputText" :placeholder="placeholder" :value="value" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

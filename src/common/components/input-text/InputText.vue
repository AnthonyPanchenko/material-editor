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
  data() {
    return {
      newValue: this.value
    };
  },
  methods: {
    onInputText(event) {
      if (!this.disabled) {
        this.onInput(this.newValue, this.name);
      }
    }
  }
};
</script>

<template>
  <label :class="['input-text', { 'disabled': disabled }]" :title="newValue">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="text" :name="name" v-on:input="onInputText" :placeholder="placeholder" v-model="newValue" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

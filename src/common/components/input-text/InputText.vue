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
    onChange: {
      type: Function,
      default: noop
    }
  },
  methods: {
    onChangeInputText(event) {
      if (!this.disabled) {
        this.onChange(this.value, this.name);
      }
    }
  }
};
</script>

<template>
  <label :class="['input-text', { 'disabled': disabled }]" :title="value">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="text" :name="name" @change="onChangeInputText" :placeholder="placeholder" v-model="value" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

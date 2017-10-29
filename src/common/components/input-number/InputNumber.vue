<script>
import noop from "../../utils/noop";

export default {
  name: "InputNumber",
  props: {
    name: String,
    value: Number,
    min: Number,
    max: Number,
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: noop
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    onChangeInputNumber(event) {
      this.onChange(this.checkedState, this.value, this.name);
    }
  }
};
</script>

<template>
  <label class="input-number" :class="`${disabled ? 'disabled' : ''} ${customClass}`" :title="value">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="number" :name="name" :min="min" :max="max" @change="onChangeInputNumber" v-model="value" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

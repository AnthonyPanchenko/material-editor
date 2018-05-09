<script>
import noop from '../../utils/noop';
import './input-number.scss';

export default {
  name: 'InputNumber',
  props: {
    name: [String, Number],
    value: { type: Number, default: 0 },
    min: Number,
    max: Number,
    step: Number,
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: { type: Boolean, default: false },
    onInput: { type: Function, default: noop },
    onClick: { type: Function, default: noop }
  },
  methods: {
    onInputClick() {
      this.onClick();
    },
    onKeyDownInput(event) {
      if (event.keyCode === 69) {
        event.preventDefault();
      }
    },
    onInputNumber(event) {
      if (!this.disabled) {
        const value = +event.target.value;
        if (!isNaN(value)) {
          this.onInput(value, this.name, +this.min, +this.max, +this.step);
        }
      }
    }
  },
  mounted() {
    this.$refs.inpNumber.addEventListener('mousewheel', noop);
  },
  beforeDestroy() {
    this.$refs.inpNumber.removeEventListener('mousewheel', noop);
  }
};
</script>

<template>
  <label :class="['input-number', { 'disabled': disabled }]" :title="value" @click="onInputClick">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input
      @keydown="onKeyDownInput"
      ref="inpNumber"
      type="number"
      :name="name"
      :step="step"
      :min="min"
      :max="max"
      v-on:input="onInputNumber"
      :value="value"
      :disabled="disabled"
    >
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

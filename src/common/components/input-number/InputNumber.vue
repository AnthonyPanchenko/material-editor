<script>
import noop from '../../utils/noop';

export default {
  name: 'InputNumber',
  props: {
    name: String,
    value: Number,
    min: Number,
    max: Number,
    step: Number,
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    onInput: {
      type: Function,
      default: noop
    },
    onClick: {
      type: Function,
      default: noop
    }
  },
  methods: {
    onInputClick() {
      this.onClick();
    },
    onInputNumber(event) {
      if (!this.disabled) {
        const value = +event.target.value.replace(/[^.\d]/g, '');
        this.onInput(value, this.name, +this.min, +this.max, +this.step);
      }
    }
  },
  mounted() {
    this.$refs.inpNumber.addEventListener('mousewheel', noop);
  },
  beforeDestroy() {
    this.$refs.inpNumber.removeEventListener('mousewheel', noop);
  },
};
</script>

<template>
  <label :class="['input-number', { 'disabled': disabled }]" :title="value" @click="onInputClick">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input ref="inpNumber" type="number" :name="name" :step="step" :min="min" :max="max" v-on:input="onInputNumber" :value="value" :disabled="disabled">
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

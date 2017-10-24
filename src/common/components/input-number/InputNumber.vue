<script>
import noop from '../../utils/noop';

export default {
  name: 'InputNumber',
  props: {
    name: String,
    value: Number,
    onChange: {
      type: Function,
      default: noop,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    onChangeInputNumber(event) {
      this.onChange(this.checkedState, this.value, this.name);
    }
  },
}
</script>

<template>
  <input type="number" class="input-number" :class="customClass" :name="name" @change="onChangeInputNumber" :value="value">
</template>

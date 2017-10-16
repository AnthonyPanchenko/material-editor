<script>
import noop from '../../utils/noop';
import emptyArray from '../../utils/emptyArray';

export default {
  name: 'CustomSelect',
  props: {
    name: String,
    onChange: {
      type: Function,
      default: noop,
    },
    selected: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: 'ctrl-select',
    },
    options: {
      type: Array,
      default: emptyArray,
    },
  },
  data() {
    return {
      selectedOption: this.selected,
    };
  },
  methods: {
    onSelectChange() {
      this.onChange(this.selectedOption, this.name);
    }
  },
}
</script>

<template>
  <select v-model="selectedOption" :name="name" :class="customClass" @change="onSelectChange">
    <option :selected="selectedOption === ''" value="">not selected</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.title }}
    </option>
  </select>
</template>

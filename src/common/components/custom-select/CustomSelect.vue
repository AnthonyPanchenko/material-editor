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
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
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
  <div class="ctrl-select" :class="customClass">
    <select v-model="selectedOption" :name="name" @change="onSelectChange" :disabled="disabled">
      <option v-for="(option, index) in options" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
import noop from '../../utils/noop';
import emptyArray from '../../utils/emptyArray';

export default {
  name: 'CustomSelect',
  props: {
    name: String,
    onChange: {
      type: Function,
      default: noop
    },
    selected: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: emptyArray
    }
  },
  data() {
    return {
      selectedOption: this.selected
    };
  },
  methods: {
    onSelectChange() {
      if (!this.disabled) {
        this.onChange(this.selectedOption, this.name);
      }
    }
  }
};
</script>

<template>
  <label :class="['ctrl-select', { 'disabled': disabled }]">
    <select v-model="selectedOption" :tabindex="`${disabled ? -1 : 0}`" :name="name" @change="onSelectChange" :disabled="disabled">
      <option v-for="(option, index) in options" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

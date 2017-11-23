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
      selectedOptionId: (this.options.length && !this.selected) ? this.options[0].id : this.selected,
    };
  },
  methods: {
    onSelectChange(event) {
      if (!this.disabled) {
        const optionObj = this.options.find(option => option.id === this.selectedOptionId);
        this.onChange(optionObj, this.name);
      }
    }
  }
};
</script>

<template>
  <label :class="['ctrl-select', { 'disabled': disabled }]">
    <select v-model="selectedOptionId" :tabindex="`${disabled ? -1 : 0}`" :name="name" @change="onSelectChange" :disabled="disabled">
      <option v-for="(option, index) in options" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

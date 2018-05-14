<template>
  <label class="checkbox-btn" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter" :class="{ 'disabled': disabled }">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="checkbox" ref="checkBox" :name="name" :value="value" @change="onChangeCheckBox" v-model="checkedState" :disabled="disabled">
    <span class="switch-icon" />
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './checkbox-btn.scss';

export default {
  name: 'CheckboxBtn',
  props: {
    name: String,
    value: [String, Number],
    prefix: [String, Number],
    sufix: [String, Number],
    onChange: { type: Function, default: noop },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      checkedState: this.checked
    };
  },
  methods: {
    onChangeCheckBox() {
      if (!this.disabled) {
        this.onChange(this.checkedState, this.name, this.value);
      }
    },
    onPressEnter() {
      this.$refs.checkBox.click();
    }
  }
};
</script>

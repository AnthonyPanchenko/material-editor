<template>
  <label :class="['radio-btn', { 'disabled': disabled }]" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="radio" ref="radioBtn" :name="name" v-model="pickedValue" :value="value" @change="onChangeRadioBtn" :disabled="disabled">
    <span class="switch-icon" />
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './radio-btn.scss';

export default {
  name: 'RadioBtn',
  props: {
    name: String,
    value: String,
    prefix: [String, Number],
    sufix: [String, Number],
    onChange: { type: Function, default: noop },
    disabled: { type: Boolean, default: false },
    picked: { type: [String, Number], default: '' }
  },
  data() {
    return {
      pickedValue: this.picked
    };
  },
  methods: {
    onChangeRadioBtn() {
      if (!this.disabled) {
        this.onChange(this.pickedValue, this.name);
      }
    },
    onPressEnter() {
      this.$refs.radioBtn.click();
    }
  }
};
</script>

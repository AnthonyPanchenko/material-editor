<script>
import noop from "../../utils/noop";

export default {
  name: "RadioBtn",
  props: {
    name: String,
    value: String,
    prefix: [String, Number],
    sufix: [String, Number],
    onChange: {
      type: Function,
      default: noop
    },
    disabled: {
      type: Boolean,
      default: false
    },
    picked: {
      type: [String, Number],
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    }
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

<template>
  <label class="radio-btn" :tabindex="`${disabled ? -1 : 0}`" @keyup.enter="onPressEnter" :class="`${disabled ? 'disabled' : ''} ${customClass}`">
    <span v-if="prefix" class="prefix"> {{ prefix }} </span>
    <input type="radio" ref="radioBtn" :name="name" v-model="pickedValue" :value="value" @change="onChangeRadioBtn" :disabled="disabled">
    <span class="switch-icon" />
    <span v-if="sufix" class="sufix"> {{ sufix }} </span>
  </label>
</template>

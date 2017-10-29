<script>
import noop from "../../utils/noop";

export default {
  name: "CustomBtn",
  props: {
    onClick: {
      type: Function,
      default: noop
    },
    customClass: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    link: String,
    iconClass: String,
    title: [String, Number],
    dataset: {
      type: [Object, Array],
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onButtonClick(event) {
      if (!this.disabled) {
        this.onClick(event, this.dataset);
      }
    }
  }
};
</script>

<template>
  <router-link v-if="link" :to="link" :tabindex="`${disabled ? -1 : 0}`" :event="disabled ? '' : 'click'" :class="`ctrl-btn ${type} ${size} ${active ? 'active' : ''} ${disabled ? 'disabled' : ''} ${this.customClass}`" @click.native="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </router-link>

  <button v-else type="button" :tabindex="`${disabled ? -1 : 0}`" :class="`ctrl-btn ${type} ${size} ${active ? 'active' : ''} ${this.customClass}`" :disabled="disabled" @click="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </button>
</template>

<script>
import noop from '../../utils/noop';

export default {
  name: 'CustomBtn',
  props: {
    onClick: {
      type: Function,
      default: noop
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
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
  <router-link v-if="link" :to="link" :tabindex="`${disabled ? -1 : 0}`" :event="disabled ? '' : 'click'" :class="['ctrl-btn', { 'active': active, 'disabled': disabled }]" @click.native="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </router-link>

  <button v-else type="button" :tabindex="`${disabled ? -1 : 0}`" :class="['ctrl-btn', { 'active': active }]" :disabled="disabled" @click="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </button>
</template>

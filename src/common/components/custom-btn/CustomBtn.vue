<template>
  <router-link v-if="link" :to="link" :tabindex="`${disabled ? -1 : 0}`" :event="disabled ? '' : 'click'" :class="['ctrl-btn', { 'active': active, 'disabled': disabled }]" @click.native="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </router-link>

  <button v-else type="button" :tabindex="`${disabled ? -1 : 0}`" :class="['ctrl-btn', { 'active': active }]" :disabled="disabled" @click="onButtonClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </button>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './custom-btn.scss';

export default {
  name: 'CustomBtn',
  props: {
    data: null,
    link: String,
    iconClass: String,
    title: [String, Number],
    onClick: { type: Function, default: noop },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false }
  },
  methods: {
    onButtonClick(event) {
      if (!this.disabled) {
        this.onClick(this.data, event);
      }
    }
  }
};
</script>

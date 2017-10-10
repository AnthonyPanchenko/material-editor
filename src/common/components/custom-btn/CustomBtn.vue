<script>
import noop from '../../utils/noop';

export default {
  name: 'CustomBtn',
  props: {
    onCustomClick: {
      type: Function,
      default: noop,
    },
    customClass: {
      type: String,
      default: 'ctrl-btn-default',
    },
    link: String,
    iconClass: String,
    title: [String, Number],
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<template>
  <router-link v-if="link" :to="link" :class="customClass" @click="onCustomClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </router-link>

  <button v-else :type="type" :class="customClass" @click="onCustomClick">
    <i v-if="iconClass" :class="iconClass" aria-hidden="true" /> {{ title }}
  </button>
</template>

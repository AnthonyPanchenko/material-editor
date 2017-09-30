<script>
import Resizer from '../directives/Resizer';

export default {
  name: 'MainLayout',
  directives: {
    Resizer,
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
  }
}
</script>

<template>
  <div class="main-layout" :class="customClass">
    <section class="controls-layout">
      <slot name="controls-header" />
      <slot name="controls-content" />
      <slot name="controls-footer" />
      <div class="grab" v-resizer="'column'" />
    </section>
    <section class="presentation-layout">
      <slot name="presentation-header" />
      <slot name="presentation-content" />
      <slot name="presentation-footer" />
    </section>
  </div>
</template>

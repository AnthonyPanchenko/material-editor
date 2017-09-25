<script>
export default {
  name: 'MainLayout',
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
      <div class="grab" />
    </section>
    <section class="presentation-layout">
      <slot name="presentation-header" />
      <slot name="presentation-content" />
      <slot name="presentation-footer" />
    </section>
  </div>
</template>

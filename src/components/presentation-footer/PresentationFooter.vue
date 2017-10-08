<script>
export default {
  name: 'PresentationFooter',
  props: {
    onToggleFullScreenMode: {
      type: Function,
      required: true,
    },
    isInFullScreenMode: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<template>
  <footer class="presentation-footer">
    <div class="controls-row">
      <span class="label fps">FPS 60</span>
      <button type="button" class="ctrl-btn-default xs" @click="onToggleFullScreenMode">
        <i :class="!isInFullScreenMode ? 'icon-minimize' : 'icon-maximize'" aria-hidden="true" />
      </button>
    </div>
  </footer>
</template>
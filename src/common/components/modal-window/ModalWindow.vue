<script>
import noop from '../../utils/noop';

export default {
  name: 'ModalWindow',
  props: {
    onOverlayClose: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: noop
    }
  },
  methods: {
    onCloseModalWindow() {
      if (this.onOverlayClose) {
        this.onClose();
      }
    }
  }
};
</script>

<template>
  <transition name="modal-window-fade">
    <div v-if="isOpen" class="modal-window" @click.self="onCloseModalWindow">
      <div class="container">
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

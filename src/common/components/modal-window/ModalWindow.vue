<script>
import noop from '../../utils/noop';

export default {
  name: 'ModalWindow',
  props: {
    сloseByOverlayClick: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    onClose: { type: Function, default: noop }
  },
  methods: {
    onCloseModalWindow() {
      if (this.сloseByOverlayClick) {
        this.onClose();
      }
    }
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-window" @click.self="onCloseModalWindow">
      <div class="container">
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

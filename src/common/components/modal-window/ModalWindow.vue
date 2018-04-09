<script>
import noop from '../../utils/noop';
import './modal-window.scss';

export default {
  name: 'ModalWindow',
  props: {
    isOpen: { type: Boolean, default: true },
    isOverlay: { type: Boolean, default: true },
    isResizable: { type: Boolean, default: false },
    isDraggable: { type: Boolean, default: false },
    isMaximized: { type: Boolean, default: false },
    сloseByOverlayClick: { type: Boolean, default: true },
    onOverlayClose: { type: Function, default: noop },
    position: { type: String, default: 'top-center' }
  },
  methods: {
    onCloseModalWindow() {
      if (this.сloseByOverlayClick) {
        this.onOverlayClose();
      }
    }
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" :class="['modal-window', { 'is-overlay': isOverlay, 'is-maximized': isMaximized }, position]" @click.self="onCloseModalWindow">
      <div v-if="isResizable" class="container">
        <span class="top-left-corner-grab" />
        <span class="top-right-corner-grab" />
        <span class="top-border-grab" />
        <span class="left-border-grab" />
        <div v-if="isDraggable" class="header">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
        <span class="bottom-left-corner-grab" />
        <span class="right-border-grab" />
        <span class="bottom-border-grab" />
        <span class="bottom-right-corner-grab" />
      </div>

      <div v-else class="container">
        <div v-if="isDraggable" class="header">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

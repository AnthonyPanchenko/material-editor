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
    position: { type: String, default: 'center-center' }
  },
  data() {
    return {
      isMouseDown: false,
      width: 1024,
      height: 500,
      offsetLeft: 0,
      offsetTop: 0
    };
  },
  methods: {
    onCloseModalWindow() {
      if (this.сloseByOverlayClick) {
        this.onOverlayClose();
      }
    },
    onMouseDown(event) {
      console.log(event);
    },
    onMouseMove(event) {
      if (this.isMouseDown) {
        console.log(event);
      }
    },
    onMouseUp() {
      this.isMouseDown = false;
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" :class="['modal-window', { 'is-overlay': isOverlay, 'is-maximized': isMaximized }, position]" @click.self="onCloseModalWindow">
      <div v-if="isResizable" class="container">
        <span class="top-left-corner" @mousedown="onMouseDown" />
        <span class="top-right-corner" @mousedown="onMouseDown" />
        <span class="top-border" @mousedown="onMouseDown" />
        <span class="left-border" @mousedown="onMouseDown" />
        <div v-if="isDraggable" class="header" @mousedown="onMouseDown">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
        <span class="bottom-left-corner" @mousedown="onMouseDown" />
        <span class="right-border" @mousedown="onMouseDown" />
        <span class="bottom-border" @mousedown="onMouseDown" />
        <span class="bottom-right-corner" @mousedown="onMouseDown" />
      </div>

      <div v-else class="container">
        <div v-if="isDraggable" class="header" @mousedown="onMouseDown">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

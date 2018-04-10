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
      mouseDownClassName: '',
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
      this.mouseDownClassName = event.target.className;
    },
    onMouseMove(event) {
      event.preventDefault();

      switch (this.mouseDownClassName) {
        case 'top-left-corner':
          console.log(event);
          break;
        case 'top-right-corner':
          console.log(event);
          break;
        case 'bottom-left-corner':
          console.log(event);
          break;
        case 'bottom-right-corner':
          console.log(event);
          break;
        case 'top-border':
          console.log(event);
          break;
        case 'left-border':
          console.log(event);
          break;
        case 'right-border':
          console.log(event);
          break;
        case 'bottom-border':
          console.log(event);
          break;
      }
    },
    onMouseUp() {
      this.mouseDownClassName = '';
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
    <div v-if="isOpen" :class="['modal-window', { 'is-overlay': isOverlay, 'is-maximized': isMaximized }, position]" @mousedown.self="onCloseModalWindow">
      <div v-if="isResizable" class="container" ref="container">
        <div class="top-left-corner" @mousedown="onMouseDown" />
        <div class="top-right-corner" @mousedown="onMouseDown" />
        <div class="top-border" @mousedown="onMouseDown" />
        <div class="left-border" @mousedown="onMouseDown" />
        <div v-if="isDraggable" class="header" @mousedown="onMouseDown">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
        <div class="bottom-left-corner" @mousedown="onMouseDown" />
        <div class="right-border" @mousedown="onMouseDown" />
        <div class="bottom-border" @mousedown="onMouseDown" />
        <div class="bottom-right-corner" @mousedown="onMouseDown" />
      </div>

      <div v-else class="container" ref="container">
        <div v-if="isDraggable" class="header" @mousedown="onMouseDown">
          <slot name="header">Header</slot>
        </div>
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

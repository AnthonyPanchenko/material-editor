<script>
import noop from '../../utils/noop';
import './modal-window.scss';

export default {
  name: 'ModalWindow',
  props: {
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
      container: null,
      initialWidth: 0,
      initialHeight: 0,
      initialOffsetTop: 0,
      initialOffsetLeft: 0,
      mouseDownClassName: '',
      width: '700px',
      height: '500px',
      left: '50px',
      top: '50px'
    };
  },
  methods: {
    onCloseModalWindow() {
      if (this.сloseByOverlayClick) {
        this.onOverlayClose();
      }
    },
    onMouseDown(event) {
      if (this.container) {
        this.mouseDownClassName = event.target.className;
        this.initialOffsetLeft = this.container.offsetLeft;
        this.initialOffsetTop = this.container.offsetTop;
        this.initialWidth = this.container.clientWidth;
        this.initialHeight = this.container.clientHeight;
      }
    },
    onMouseMove(event) {
      if (this.container) {
        event.preventDefault();

        switch (this.mouseDownClassName) {
          case 'top-left-corner':
            this.left = `${event.pageX}px`;
            this.top = `${event.pageY}px`;
            this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
            this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
            break;
          case 'top-right-corner':
            this.top = `${event.pageY}px`;
            this.width = `${event.pageX - this.container.offsetLeft}px`;
            this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
            break;
          case 'bottom-left-corner':
            this.left = `${event.pageX}px`;
            this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
            this.height = `${event.pageY - this.container.offsetTop}px`;
            break;
          case 'bottom-right-corner':
            this.width = `${event.pageX - this.container.offsetLeft}px`;
            this.height = `${event.pageY - this.container.offsetTop}px`;
            break;
          case 'top-border':
            this.top = `${event.pageY}px`;
            this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
            break;
          case 'left-border':
            this.left = `${event.pageX}px`;
            this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
            break;
          case 'right-border':
            this.width = `${event.pageX - this.container.offsetLeft}px`;
            break;
          case 'bottom-border':
            this.height = `${event.pageY - this.container.offsetTop}px`;
            break;
        }
      }
    },
    onMouseUp() {
      this.mouseDownClassName = '';
    }
  },
  mounted() {
    this.container = this.$refs.container;
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
    <div
      @mousedown.self="onCloseModalWindow"
      :class="['modal-window', { 'is-overlay': isOverlay, 'is-maximized': isMaximized }, isResizable ? '' : position]"
    >
      <div
        v-if="isResizable"
        class="container"
        ref="container"
        :style="{ width: width, height: height, top: top, left: left }"
      >
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

      <div v-else class="container">
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

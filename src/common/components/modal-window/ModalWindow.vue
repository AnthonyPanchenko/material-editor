<template>
  <transition name="fade">
    <div
      @mousedown.self="onCloseModalWindow"
      :class="['modal-window', { 'is-overlay': isOverlay, 'is-maximized': isMaximized }, isResizable ? '' : position]"
    >
      <div
        v-if="isResizable"
        class="content"
        ref="modalWindowContent"
        @mousedown="onContentMouseDown"
        :style="{ width: width, height: height, top: top, left: left }"
      >
        <div class="top-left-corner" />
        <div class="top-right-corner" />
        <div class="top-border" />
        <div class="left-border" />
        <slot>Content here</slot>
        <div class="bottom-left-corner" />
        <div class="right-border" />
        <div class="bottom-border" />
        <div class="bottom-right-corner" />
      </div>

      <div v-else class="content">
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './modal-window.scss';

export default {
  name: 'ModalWindow',
  props: {
    isOverlay: { type: Boolean, default: true },
    isResizable: { type: Boolean, default: false },
    isMaximized: { type: Boolean, default: false },
    сloseByOverlayClick: { type: Boolean, default: false },
    onOverlayClose: { type: Function, default: noop },
    position: { type: String, default: 'center-center' }
  },
  data() {
    return {
      container: null,
      initialX: 0,
      initialY: 0,
      initialWidth: 0,
      initialHeight: 0,
      initialOffsetTop: 0,
      initialOffsetLeft: 0,
      executedFunction: null,
      width: '1024px',
      height: '700px',
      left: '50px',
      top: '50px'
    };
  },
  methods: {
    onDragModalWindow(event) {
      this.left = `${event.pageX - (this.initialX - this.initialOffsetLeft)}px`;
      this.top = `${event.pageY - (this.initialY - this.initialOffsetTop)}px`;
    },
    onResizeTopLeftCorner(event) {
      this.left = `${event.pageX}px`;
      this.top = `${event.pageY}px`;
      this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
      this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
    },
    onResizeTopRightCorner(event) {
      this.top = `${event.pageY}px`;
      this.width = `${event.pageX - this.contentBox.offsetLeft}px`;
      this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
    },
    onResizeBottomLeftCorner(event) {
      this.left = `${event.pageX}px`;
      this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
      this.height = `${event.pageY - this.contentBox.offsetTop}px`;
    },
    onResizeBottomRightCorner(event) {
      this.width = `${event.pageX - this.contentBox.offsetLeft}px`;
      this.height = `${event.pageY - this.contentBox.offsetTop}px`;
    },
    onResizeTopBorder(event) {
      this.top = `${event.pageY}px`;
      this.height = `${this.initialHeight - (event.pageY - this.initialOffsetTop)}px`;
    },
    onResizeLeftBorder(event) {
      this.left = `${event.pageX}px`;
      this.width = `${this.initialWidth - (event.pageX - this.initialOffsetLeft)}px`;
    },
    onResizeRightBorder(event) {
      this.width = `${event.pageX - this.contentBox.offsetLeft}px`;
    },
    onResizeBottomBorder(event) {
      this.height = `${event.pageY - this.contentBox.offsetTop}px`;
    },
    onCloseModalWindow() {
      if (this.сloseByOverlayClick) {
        this.onOverlayClose();
      }
    },
    getExecutedFunctionByClassName(className) {
      if (className.indexOf('header') !== -1) {
        return this.onDragModalWindow;
      }

      switch (className) {
        case 'top-left-corner': return this.onResizeTopLeftCorner;
        case 'top-right-corner': return this.onResizeTopRightCorner;
        case 'bottom-left-corner': return this.onResizeBottomLeftCorner;
        case 'bottom-right-corner': return this.onResizeBottomRightCorner;
        case 'top-border': return this.onResizeTopBorder;
        case 'left-border': return this.onResizeLeftBorder;
        case 'right-border': return this.onResizeRightBorder;
        case 'bottom-border': return this.onResizeBottomBorder;
        default: return null;
      }
    },
    onContentMouseDown(event) {
      if (this.contentBox) {
        this.executedFunction = this.getExecutedFunctionByClassName(event.target.className);
        this.initialOffsetLeft = this.contentBox.offsetLeft;
        this.initialOffsetTop = this.contentBox.offsetTop;
        this.initialWidth = this.contentBox.clientWidth;
        this.initialHeight = this.contentBox.clientHeight;
        this.initialX = event.pageX;
        this.initialY = event.pageY;
      }
    },
    onMouseMove(event) {
      if (this.contentBox && this.executedFunction) {
        event.preventDefault();
        this.executedFunction(event);
      }
    },
    onMouseUp() {
      this.executedFunction = null;
    }
  },
  mounted() {
    this.contentBox = this.$refs.modalWindowContent;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
</script>

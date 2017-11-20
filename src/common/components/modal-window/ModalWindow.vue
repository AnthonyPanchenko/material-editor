<script>
export default {
  name: 'ModalWindow',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpenState: isOpen,
    };
  },
  methods: {
    onCloseModalWindow() {
      this.isOpenState = false;
    }
  }
};
</script>

<template>
  <transition name="modal-window-fade">
    <div v-if="isOpenState" class="modal-window" @click="onCloseModalWindow">
      <div class="container">
        <slot>Content here</slot>
      </div>
    </div>
  </transition>
</template>

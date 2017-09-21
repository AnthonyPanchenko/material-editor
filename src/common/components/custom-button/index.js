import Vue from 'vue';
import template from './button.html';

Vue.component('custom-button', {
  template,
  props: {
    onClick: {
      type: Function,
      default: () => undefined,
    },
    customClass: {
      type: String,
      default: 'custom-button',
    },
    link: String,
    iconClass: String,
    title: [String, Number],
    type: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    onCustomBtnClick() {
      this.$emit('onClick');
    },
  },
});

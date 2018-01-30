<script>
import noop from '../../utils/noop';

export default {
  name: 'OutputColorBtn',
  props: {
    onClick: { type: Function, default: noop },
    color: { type: Object, default: () => ({ r: 70, g: 70, b: 220, a: 1 }) },
    disabled: { type: Boolean, default: false },
    data: null
  },
  data() {
    return {
      iconColor: (255 / 3) > ((this.color.r + this.color.g + this.color.b) / 3) ? '#fff' : '#000',
    };
  },
  methods: {
    onButtonClick(event) {
      if (!this.disabled) {
        this.onClick(this.data, event);
      }
    }
  }
};
</script>

<template>
  <button :style="{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }" type="button" :tabindex="`${disabled ? -1 : 0}`" class="output-color-btn" :disabled="disabled" @click="onButtonClick">
    <i class="icon-color-palette" :style="{ color: iconColor }" />
  </button>
</template>

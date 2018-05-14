<template>
  <button
    ref="buttonTrigger"
    :style="{ backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})` }"
    type="button"
    class="output-color-btn"
    @click="onButtonClick"
  >
    <i class="icon-color-palette" :style="{ color: iconColor }" />
  </button>
</template>

<script>
import { noop } from '../../utils/base-helper';
import './output-color-btn.scss';

export default {
  name: 'OutputColorBtn',
  props: {
    name: { type: String, default: '' },
    onClick: { type: Function, default: noop },
    color: { type: Array, default: () => [70, 70, 220, 1] }
  },
  data() {
    return {
      buttonTrigger: null,
      iconColor: (255 / 3) > ((this.color[0] + this.color[1] + this.color[2]) / 3) ? '#fff' : '#000'
    };
  },
  methods: {
    onButtonClick() {
      this.onClick(this.buttonTrigger, this.name, this.color);
    }
  },
  mounted() {
    this.buttonTrigger = this.$refs.buttonTrigger;
  }
};
</script>

<script>
import MouseMove from "../mouse-move/MouseMove.vue";

export default {
  name: "Vec2Picker",
  components: {
    MouseMove,
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      posTop: 0,
      posLeft: 0,
      range: this.max - this.min,
      vec2Picker: null
    };
  },
  methods: {
    setCirclePosition(x, y, node) {
      this.posLeft = (x / node.clientWidth) * 100;
      this.posTop = (y / node.clientHeight) * 100;

      // const valueX = ((this.range / node.clientWidth) * x) - (this.range - this.max);
      // const valueY = ((this.range / node.clientHeight) * y) - (this.range - this.max);

      // const x = Math.round(((valueX - this.min) / this.range) * node.clientWidth);
      // const y = Math.round(((valueY - this.min) / this.range) * node.clientHeight);
    }
  },
};
</script>

<template>
  <mouse-move class="vec2-picker" :onMove="setCirclePosition">
    <span class="horizontal-line" />
    <span class="vertical-line" />
    <i class="circle icon-radio-checked" :style="{ top: `calc(${posTop}% - 3.5px)`, left: `calc(${posLeft}% - 3.5px)` }" />
  </mouse-move>
</template>

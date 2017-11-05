<script>
import clamp from "../../utils/clamp";
import getElementOffsets from "../../utils/getElementOffsets";

export default {
  name: "Vec2Picker",
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
      offsets: null,
      isMouseDown: false,
      range: this.max - this.min,
      vec2Picker: null
    };
  },
  methods: {
    onStartCalcVec2(event) {
      event.preventDefault();
      this.isMouseDown = true;
      this.offsets = getElementOffsets(this.$refs.vec2Picker);
      console.log(this.offsets);
      this.defineDirection(event);
    },
    onCalcVec2(event) {
      event.preventDefault();

      if (this.isMouseDown) {
        this.defineDirection(event);
      }
    },
    onEndCalcVec2() {
      this.isMouseDown = false;
    },
    defineDirection(event) {
      const currentX = clamp(event.pageX - this.offsets.left, 0, this.vec2Picker.clientWidth);
      const currentY = clamp(event.pageY - this.offsets.top, 0, this.vec2Picker.clientHeight);

      this.posLeft = (currentX / this.vec2Picker.clientWidth) * 100;
      this.posTop = (currentY / this.vec2Picker.clientHeight) * 100;

      // const valueX = ((this.range / this.vec2Picker.clientWidth) * currentX) - (this.range - this.max);
      // const valueY = ((this.range / this.vec2Picker.clientHeight) * currentY) - (this.range - this.max);

      // const x = Math.round(((valueX - this.min) / this.range) * this.vec2Picker.clientWidth);
      // const y = Math.round(((valueY - this.min) / this.range) * this.vec2Picker.clientHeight);
    }
  },
  mounted() {
    this.vec2Picker = this.$refs.vec2Picker;

    document.addEventListener("mousemove", this.onCalcVec2);
    document.addEventListener("mouseup", this.onEndCalcVec2);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.onCalcVec2);
    document.removeEventListener("mouseup", this.onEndCalcVec2);
  }
};
</script>

<template>
  <div class="vec2-picker" ref="vec2Picker" v-on:mousedown="onStartCalcVec2">
    <span class="horizontal-line" />
    <span class="vertical-line" />
    <i class="circle" :style="{ top: `calc(${posTop}% - 2.5px)`, left: `calc(${posLeft}% - 2.5px)` }" />
  </div>
</template>

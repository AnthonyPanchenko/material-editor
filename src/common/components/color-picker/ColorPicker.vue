<script>
import clamp from "../../utils/clamp";
import getElementOffsets from "../../utils/getElementOffsets";

export default {
  name: "ColorPicker",
  props: {
    color: {
      type: Array,
      default: [255, 255, 255, 255]
    }
  },
  data() {
    return {
      posTop: 0,
      posLeft: 0,
      offsets: null,
      isMouseDown: false,
      range: this.max - this.min,
      colorPicker: null
    };
  },
  methods: {
    onStartCalcVec2(event) {
      event.preventDefault();
      this.isMouseDown = true;
      this.offsets = getElementOffsets(this.$refs.colorPicker);

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
      const currentX = clamp(event.pageX - this.offsets.left, 0, this.colorPicker.clientWidth);
      const currentY = clamp(event.pageY - this.offsets.top, 0, this.colorPicker.clientHeight);

      // this.posLeft = (currentX / this.colorPicker.clientWidth) * 100;
      // this.posTop = (currentY / this.colorPicker.clientHeight) * 100;

      // const valueX = ((this.range / this.colorPicker.clientWidth) * currentX) - (this.range - this.max);
      // const valueY = ((this.range / this.colorPicker.clientHeight) * currentY) - (this.range - this.max);

      // const x = Math.round(((valueX - this.min) / this.range) * this.colorPicker.clientWidth);
      // const y = Math.round(((valueY - this.min) / this.range) * this.colorPicker.clientHeight);
    }
  },
  mounted() {
    this.colorPicker = this.$refs.colorPicker;

    document.addEventListener("mousemove", this.onCalcVec2);
    document.addEventListener("mouseup", this.onEndCalcVec2);
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", this.onCalcVec2);
    document.removeEventListener("mouseup", this.onEndCalcVec2);
  }
};

/*
window.onload = function () {
  const canvasGradientAlpha = document.querySelector('.gradient-alpha');
  const canvasGradientBlock = document.querySelector('.gradient-block');
  const canvasGradientStrip = document.querySelector('.gradient-strip');

  const gradientAlpha = new GradientAlpha(canvasGradientAlpha);
  const gradientBlock = new GradientBlock(canvasGradientBlock);
  const gradientStrip = new GradientStrip(canvasGradientStrip);

  canvasGradientAlpha.addEventListener('mousedown', (e) => gradientAlpha.onMouseDown(e));
  canvasGradientBlock.addEventListener('mousedown', (e) => gradientBlock.onMouseDown(e));
  canvasGradientStrip.addEventListener('mousedown', (e) => gradientStrip.onMouseDown(e));

  gradientAlpha.init();
  gradientBlock.init();
  gradientStrip.init();

  document.addEventListener('mousemove', (e) => {
    gradientAlpha.onMouseMove(e);
    gradientBlock.onMouseMove(e);
    gradientStrip.onMouseMove(e);
  });
  document.addEventListener('mouseup', (e) => {
    gradientAlpha.onMouseUp(e);
    gradientBlock.onMouseUp(e);
    gradientStrip.onMouseUp(e);
  });
}
*/
</script>

<template>
  <div class="color-picker" ref="colorPicker" v-on:mousedown="onStartCalcVec2">
    <span class="horizontal-line" />
    <span class="vertical-line" />
    <i class="circle" :style="{ top: `calc(${posTop}% - 2.5px)`, left: `calc(${posLeft}% - 2.5px)` }" />
  </div>
</template>

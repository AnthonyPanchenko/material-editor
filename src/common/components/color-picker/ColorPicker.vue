<script>
import clamp from "../../utils/clamp";
import getElementOffsets from "../../utils/getElementOffsets";

import AlphaScale from "./utils/AlphaScale";
import GradientBox from "./utils/GradientBox";
import HueScale from "./utils/HueScale";

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
      alphaScale: new AlphaScale(),
      gradientBox: new GradientBox(),
      hueScale: new HueScale()
    };
  },
  methods: {
    onMouseDownAlphaScale(event) {
      alphaScale.onMouseDown(event);
    },
    onMouseDownGradientBox(event) {
      gradientBox.onMouseDown(event);
    },
    onMouseDownHueScale(event) {
      hueScale.onMouseDown(event);
    },
    defineDirection(event) {
      const currentX = clamp(
        event.pageX - this.offsets.left,
        0,
        this.colorPicker.clientWidth
      );
      const currentY = clamp(
        event.pageY - this.offsets.top,
        0,
        this.colorPicker.clientHeight
      );

      // this.posLeft = (currentX / this.colorPicker.clientWidth) * 100;
      // this.posTop = (currentY / this.colorPicker.clientHeight) * 100;

      // const valueX = ((this.range / this.colorPicker.clientWidth) * currentX) - (this.range - this.max);
      // const valueY = ((this.range / this.colorPicker.clientHeight) * currentY) - (this.range - this.max);

      // const x = Math.round(((valueX - this.min) / this.range) * this.colorPicker.clientWidth);
      // const y = Math.round(((valueY - this.min) / this.range) * this.colorPicker.clientHeight);
    }
  },
  mounted() {
    this.alphaScale.init(this.$refs.alphaScale);
    this.gradientBox.init(this.$refs.gradientBox);
    this.hueScale.init(this.$refs.hueScale);

    document.addEventListener("mousemove", event => {
      this.alphaScale.onMouseMove(event);
      this.gradientBox.onMouseMove(event);
      this.hueScale.onMouseMove(event);
    });

    document.addEventListener("mouseup", event => {
      this.alphaScale.onMouseUp(event);
      this.gradientBox.onMouseUp(event);
      this.hueScale.onMouseUp(event);
    });
  },
  beforeDestroy() {
    document.removeEventListener("mousemove", event => {
      this.alphaScale.onMouseMove(event);
      this.gradientBox.onMouseMove(event);
      this.hueScale.onMouseMove(event);
    });

    document.removeEventListener("mouseup", event => {
      this.alphaScale.onMouseUp(event);
      this.gradientBox.onMouseUp(event);
      this.hueScale.onMouseUp(event);
    });
  }
};
</script>

<template>
  <div class="color-picker">
    <div class="alpha-scale" ref="alphaScale" v-on:mousedown="onMouseDownAlphaScale">
      <span class="bg-gradient"></span>
      <i class="horizontal-triangles" :style="{ left: `calc(${25}% - 5px)` }" />
    </div>

    <div class="container">
      <div class="gradient-box" ref="gradientBox" v-on:mousedown="onMouseDownGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: '#000', top: `calc(${25}% - 5px)`, left: `calc(${25}% - 5px)` }" />
      </div>

      <div class="hue-scale" ref="hueScale" v-on:mousedown="onMouseDownHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${25}% - 5px)` }" />
      </div>
    </div>

    <div class="color-controls"></div>
  </div>
</template>

<script>
import { HSVoRGB, RGBtoHSV, RGBtoHEX, HEXtoRGB } from '../../utils/color-converters';
import colorModelTypes from '../../constants/color-model-types';
import MouseMove from '../mouse-move/MouseMove.vue';
import CustomBtn from '../custom-btn/CustomBtn.vue';
import InputNumber from '../input-number/InputNumber.vue';
import InputText from '../input-text/InputText.vue';

export default {
  name: 'ColorPicker',
  components: {
    MouseMove,
    CustomBtn,
    InputNumber,
    InputText,
  },
  props: {
    color: {
      type: Array,
      default: () => [255, 255, 255, 255]
    }
  },
  data() {
    return {
      alphaScaleWidth: null,
      activeColorMode: colorModelTypes.RGB,
      hTrianglesLeftPos: 0,
      hueScaleTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
      hTrianglesBgColor: '#000',
      circleColor: '#000',
      colorModelTypes,

      hex: '#4d5f7c',

      RGB: {
        r: 77,
        g: 95,
        b: 124
      },

      HSV: {
        h: 217,
        s: 23,
        v: 40
      },

      alpha: 1
    };
  },
  methods: {
    onMoveAlphaScale(x, y, node) {
      this.hTrianglesLeftPos = x;
      this.hTrianglesBgColor = x > node.clientWidth / 2 ? '#fff' : '#000';
      this.alpha = +(x / node.clientWidth).toFixed(2);
    },

    onMoveGradientBox(x, y, node) {
      const leftPos = (x / node.clientWidth) * 100;
      const topPos = (y / node.clientHeight) * 100;

      this.HSV.s = 100 - +leftPos.toFixed(0);
      this.HSV.v = 100 - +topPos.toFixed(0);

      this.circleLeftPos = leftPos;
      this.circleTopPos = topPos;

      this.circleColor = y > node.clientHeight / 2 ? '#fff' : '#000';
    },

    onMoveHueScale(x, y, node) {
      const pos = (y / node.clientHeight) * 100;

      this.HSV.h = Math.round(pos * 360 / 100);
      this.hueScaleTrianglesTopPos = pos;
    },

    onInputHexInput(value) {
      this.hex = value;
    },

    onInputRgbaValue(value, channel) {
      this.RGB[channel] = value;
    },

    onInputHslaValue(value, channel) {
      this.HSV[channel] = value;

      if (channel === 'h') {
        this.hueScaleTrianglesTopPos = Math.round((value / 360) * 100);
      }
    },

    onInputAlphaValue(value) {
      this.alpha = value;

      const position = this.alphaScaleWidth.clientWidth * value;
      this.hTrianglesLeftPos = position;
      this.hTrianglesBgColor = position > this.alphaScaleWidth.clientWidth / 2 ? '#fff' : '#000';
    },

    switchToRgbColorMode() {
      this.activeColorMode = this.colorModelTypes.RGB;
    },

    switchToHexColorMode() {
      this.activeColorMode = this.colorModelTypes.HEX;
    },

    switchToHslColorMode() {
      this.activeColorMode = this.colorModelTypes.HSV;
    }
  },

  mounted() {
    this.hueScaleTrianglesTopPos = Math.round((this.HSV.h / 360) * 100);
    this.alphaScaleWidth = this.$refs.alphaScaleWidth.$el;

    const position = this.alphaScaleWidth.clientWidth * this.alpha;
    this.hTrianglesLeftPos = position;
    this.hTrianglesBgColor = position > this.alphaScaleWidth.clientWidth / 2 ? '#fff' : '#000';
  }
};
</script>

<template>
  <div class="color-picker">
    <mouse-move ref="alphaScaleWidth" class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient"></span>
      <i class="horizontal-triangles" :style="{ borderTopColor: hTrianglesBgColor, borderBottomColor: hTrianglesBgColor, left: `calc(${hTrianglesLeftPos}px - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: circleColor, top: `calc(${circleTopPos}% - 4px)`, left: `calc(${circleLeftPos}% - 4px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${hueScaleTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div v-if="activeColorMode === colorModelTypes.RGB" class="color-controls">
      <input-number prefix="R" name="r" :value="RGB.r" :min="0" :max="255" :step="1" :onInput="onInputRgbaValue" />
      <input-number prefix="G" name="g" :value="RGB.g" :min="0" :max="255" :step="1" :onInput="onInputRgbaValue" />
      <input-number prefix="B" name="b" :value="RGB.b" :min="0" :max="255" :step="1" :onInput="onInputRgbaValue" />
      <input-number prefix="A" name="alpha" :value="alpha" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToHexColorMode" />
    </div>

    <div v-if="activeColorMode === colorModelTypes.HEX" class="color-controls">
      <input-text prefix="HEX" :value="hex" :onInput="onInputHexInput" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToHslColorMode" />
    </div>

    <div v-if="activeColorMode === colorModelTypes.HSV" class="color-controls">
      <input-number prefix="H°" name="h" :value="HSV.h" :min="0" :max="360" :step="1" :onInput="onInputHslaValue" />
      <input-number prefix="S%" name="s" :value="HSV.s" :min="0" :max="100" :step="1" :onInput="onInputHslaValue" />
      <input-number prefix="V%" name="v" :value="HSV.v" :min="0" :max="100" :step="1" :onInput="onInputHslaValue" />
      <input-number prefix="A" name="alpha" :value="alpha" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToRgbColorMode" />
    </div>
  </div>
</template>

<script>
import { HSVtoRGB, RGBtoHSV, RGBtoHEX, HEXtoRGB, hueToRGB } from '../../utils/color-converters';
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
      default: () => [255, 154, 23, 1]
    }
  },
  data() {
    return {
      gradientBox: null,
      alphaScale: null,
      activeColorMode: 'RGB',
      alphaScaleTrianglesLeftPos: 0,
      hueScaleTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
      alphaScaleTrianglesBgColor: '#000',
      circleColor: '#000',
      gradientBoxColor: { r: 69, g: 28, b: 28 },

      HEX: '4d5f7c',
      RGB: { r: 69, g: 28, b: 28 },
      HSV: { h: 217, s: 23, v: 40 },
      alpha: 1
    };
  },
  methods: {
    onMoveAlphaScale(x, y, node) {
      this.alphaScaleTrianglesLeftPos = x;
      this.alphaScaleTrianglesBgColor = x > node.clientWidth / 2 ? '#fff' : '#000';
      this.alpha = +(x / node.clientWidth).toFixed(2);
    },

    onMoveGradientBox(x, y, node) {
      const leftPos = (x / node.clientWidth) * 100;
      const topPos = (y / node.clientHeight) * 100;

      this.HSV.s = +leftPos.toFixed(0);
      this.HSV.v = 100 - +topPos.toFixed(0);

      this.circleLeftPos = leftPos;
      this.circleTopPos = topPos;

      this.circleColor = (y > node.clientHeight / 2) ? '#fff' : '#000';

      this.RGB = HSVtoRGB(this.HSV.h, this.HSV.s, this.HSV.v);
      this.HEX = RGBtoHEX(this.RGB.r, this.RGB.g, this.RGB.b);
    },

    onMoveHueScale(x, y, node) {
      const pos = (y / node.clientHeight) * 100;

      const hue = Math.round(pos * 360 / 100);
      this.HSV.h = (hue === 360) ? 0 : hue;
      this.hueScaleTrianglesTopPos = pos;

      this.RGB = HSVtoRGB(this.HSV.h, this.HSV.s, this.HSV.v);
      this.HEX = RGBtoHEX(this.RGB.r, this.RGB.g, this.RGB.b);

      this.gradientBoxColor = hueToRGB(this.HSV.h);

      console.log(this.gradientBoxColor);
    },

    onInputHexInput(value) {
      this.HEX = value.substring(1);

      this.RGB = HEXtoRGB(this.HEX);
      this.HSV = RGBtoHSV(this.RGB.r, this.RGB.g, this.RGB.b);
    },

    onInputRgbValue(value, channel) {
      this.RGB[channel] = value;

      this.HSV = RGBtoHSV(this.RGB.r, this.RGB.g, this.RGB.b);
      this.HEX = RGBtoHEX(this.RGB.r, this.RGB.g, this.RGB.b);
    },

    onInputHsvValue(value, channel) {
      if (channel === 'h') {
        this.HSV[channel] = (value === 360) ? 0 : value;
        this.hueScaleTrianglesTopPos = Math.round((value / 360) * 100);
        this.gradientBoxColor = hueToRGB(this.HSV.h);
      }

      if (channel === 's') {
        this.HSV[channel] = value;
        this.circleLeftPos = value;
      }

      if (channel === 'v') {
        this.HSV[channel] = value;
        this.circleTopPos = 100 - value;
        this.circleColor = (value < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
      }

      this.RGB = HSVtoRGB(this.HSV.h, this.HSV.s, this.HSV.v);
      this.HEX = RGBtoHEX(this.RGB.r, this.RGB.g, this.RGB.b);
    },

    onInputAlphaValue(value) {
      this.alpha = value;

      const position = this.alphaScale.clientWidth * value;
      this.alphaScaleTrianglesLeftPos = position;
      this.alphaScaleTrianglesBgColor = position > this.alphaScale.clientWidth / 2 ? '#fff' : '#000';
    },

    switchColorMode(event, colorMode) {
      this.activeColorMode = colorMode;
    }
  },

  mounted() {
    this.hueScaleTrianglesTopPos = Math.round((this.HSV.h / 360) * 100);
    this.alphaScale = this.$refs.alphaScale.$el;
    this.gradientBox = this.$refs.gradientBox.$el;

    const position = this.alphaScale.clientWidth * this.alpha;
    this.alphaScaleTrianglesLeftPos = position;
    this.alphaScaleTrianglesBgColor = position > this.alphaScale.clientWidth / 2 ? '#fff' : '#000';

    this.circleLeftPos = this.HSV.s;
    this.circleTopPos = 100 - this.HSV.v;
    this.circleColor = (this.HSV.v < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';

    console.log(RGBtoHSV(this.RGB.r, this.RGB.g, this.RGB.b));
  }
};
</script>

<template>
  <div class="color-picker">
    <mouse-move ref="alphaScale" class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient" :style="{background: `linear-gradient(to left, #${HEX} 0%, transparent 100%)`}" />
      <i class="horizontal-triangles" :style="{ borderTopColor: alphaScaleTrianglesBgColor, borderBottomColor: alphaScaleTrianglesBgColor, left: `calc(${alphaScaleTrianglesLeftPos}px - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move ref="gradientBox" :styleCss="{backgroundColor: `rgb(${gradientBoxColor.r}, ${gradientBoxColor.g}, ${gradientBoxColor.b})`}" class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: circleColor, top: `calc(${circleTopPos}% - 4px)`, left: `calc(${circleLeftPos}% - 4px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${hueScaleTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div v-if="activeColorMode === 'RGB'" class="color-controls">
      <input-number prefix="R" name="r" :value="RGB.r" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="G" name="g" :value="RGB.g" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="B" name="b" :value="RGB.b" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="A" name="alpha" :value="alpha" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" dataset="HEX" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HEX'" class="color-controls">
      <input-text prefix="HEX" :value="`#${HEX}`" :onInput="onInputHexInput" />
      <custom-btn iconClass="icon-back-forth" dataset="HSV" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HSV'" class="color-controls">
      <input-number prefix="H°" name="h" :value="HSV.h" :min="0" :max="360" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="S%" name="s" :value="HSV.s" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="V%" name="v" :value="HSV.v" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="A" name="alpha" :value="alpha" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" dataset="RGB" :onClick="switchColorMode" />
    </div>
  </div>
</template>

<script>
import { hsvToRgb, rgbToHsv, rgbToHex, hexToRgb, hueToRgb, isHex } from '../../utils/color-converters';
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
      type: Object,
      default: () => ({ r: 70, g: 70, b: 220, a: 1 })
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
      gradientBoxColor: { r: 0, g: 0, b: 255 },

      hex: '4646dc',
      rgb: { r: 70, g: 70, b: 220, a: 1 },
      hsv: { h: 240, s: 68, v: 86, a: 1 }
    };
  },
  methods: {
    setColorAndPositionOfAlphaScaleTriangles() {
      const posX = this.alphaScale.clientWidth * this.rgb.a;
      this.alphaScaleTrianglesLeftPos = posX;
      this.alphaScaleTrianglesBgColor = (posX > this.alphaScale.clientWidth / 2) ? (255 / 3) > ((this.rgb.r + this.rgb.g + this.rgb.b) / 3) ? '#fff' : '#000' : '#000';
    },

    setCircleColorAndPosition() {
      this.circleLeftPos = this.hsv.s;
      this.circleTopPos = 100 - this.hsv.v;
      this.circleColor = (this.hsv.v < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
    },

    onMoveAlphaScale(x, y, node) {
      const alpha = +(x / node.clientWidth).toFixed(2);

      this.hsv.a = alpha;
      this.rgb.a = alpha;

      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, alpha);
      this.setColorAndPositionOfAlphaScaleTriangles();
    },

    onMoveGradientBox(x, y, node) {
      const leftPos = (x / node.clientWidth) * 100;
      const topPos = (y / node.clientHeight) * 100;

      this.hsv.s = +leftPos.toFixed(0);
      this.hsv.v = 100 - +topPos.toFixed(0);

      this.rgb = hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v, this.hsv.a);
      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);

      this.setColorAndPositionOfAlphaScaleTriangles();
      this.setCircleColorAndPosition();
    },

    onMoveHueScale(x, y, node) {
      const pos = (y / node.clientHeight) * 100;

      const hue = Math.round(pos * 360 / 100);
      this.hsv.h = (hue === 360) ? 0 : hue;
      this.hueScaleTrianglesTopPos = pos;

      this.rgb = hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v, this.hsv.a);
      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);

      this.gradientBoxColor = hueToRgb(this.hsv.h);
      this.setColorAndPositionOfAlphaScaleTriangles();
    },

    onInputHexValue(value) {
      this.hex = value.replace('#', '');

      if (isHex(this.hex)) {
        this.rgb = hexToRgb(this.hex);
        this.hsv = rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);

        this.gradientBoxColor = hueToRgb(this.hsv.h);
        this.setColorAndPositionOfAlphaScaleTriangles();
        this.setCircleColorAndPosition();
      }
    },

    onInputRgbValue(value, channel) {
      this.rgb[channel] = value;

      this.hsv = rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);
      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);

      this.gradientBoxColor = hueToRgb(this.hsv.h);
      this.setColorAndPositionOfAlphaScaleTriangles();
      this.setCircleColorAndPosition();
    },

    onInputHsvValue(value, channel) {
      if (channel === 'h') {
        this.hsv[channel] = (value === 360) ? 0 : value;
        this.hueScaleTrianglesTopPos = Math.round((value / 360) * 100);
        this.gradientBoxColor = hueToRgb(this.hsv.h);
      }

      if (channel === 's') {
        this.hsv[channel] = value;
        this.circleLeftPos = value;
      }

      if (channel === 'v') {
        this.hsv[channel] = value;
        this.circleTopPos = 100 - value;
        this.circleColor = (value < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
      }

      if (channel === 'a') {
        this.hsv[channel] = value;
      }

      this.rgb = hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v, this.hsv.a);
      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);

      this.setColorAndPositionOfAlphaScaleTriangles();
      this.setCircleColorAndPosition();
    },

    onInputAlphaValue(value) {
      this.hsv.a = value;
      this.rgb.a = value;

      this.hex = rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b, value);
      this.setColorAndPositionOfAlphaScaleTriangles();
    },

    switchColorMode(colorMode, event) {
      this.activeColorMode = colorMode;
    }
  },

  mounted() {
    this.rgb = this.color;
    this.hsv = rgbToHsv(this.color.r, this.color.g, this.color.b, this.color.a);
    this.hex = rgbToHex(this.color.r, this.color.g, this.color.b, this.color.a);

    this.hueScaleTrianglesTopPos = Math.round((this.hsv.h / 360) * 100);
    this.alphaScale = this.$refs.alphaScale.$el;
    this.gradientBox = this.$refs.gradientBox.$el;

    this.gradientBoxColor = hueToRgb(this.hsv.h);
    this.setColorAndPositionOfAlphaScaleTriangles();
    this.setCircleColorAndPosition();
  }
};
</script>

<template>
  <div class="color-picker">
    <mouse-move ref="alphaScale" class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient" :style="{ background: `linear-gradient(to left, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) 0%, transparent 100%)` }" />
      <i class="horizontal-triangles" :style="{ borderTopColor: alphaScaleTrianglesBgColor, borderBottomColor: alphaScaleTrianglesBgColor, left: `calc(${alphaScaleTrianglesLeftPos}px - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move ref="gradientBox" :styleCss="{ backgroundColor: `rgb(${gradientBoxColor.r}, ${gradientBoxColor.g}, ${gradientBoxColor.b})` }" class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: circleColor, top: `calc(${circleTopPos}% - 4px)`, left: `calc(${circleLeftPos}% - 4px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${hueScaleTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div v-if="activeColorMode === 'RGB'" class="color-controls">
      <input-number prefix="R" name="r" :value="rgb.r" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="G" name="g" :value="rgb.g" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="B" name="b" :value="rgb.b" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="A" name="a" :value="rgb.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="HEX" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HEX'" class="color-controls">
      <input-text prefix="HEX" :value="`#${hex}`" :onInput="onInputHexValue" />
      <custom-btn iconClass="icon-back-forth" data="HSV" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HSV'" class="color-controls">
      <input-number prefix="H°" name="h" :value="hsv.h" :min="0" :max="360" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="S%" name="s" :value="hsv.s" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="V%" name="v" :value="hsv.v" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="A" name="a" :value="hsv.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="RGB" :onClick="switchColorMode" />
    </div>
  </div>
</template>

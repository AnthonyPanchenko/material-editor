<script>
import noop from '../../utils/noop';
import { hsvToRgb, rgbToHsv, rgbToHex, hexToRgb, hueToRgb, isHex } from '../../utils/color-converters';
import MouseMove from '../mouse-move/MouseMove.vue';
import CustomBtn from '../custom-btn/CustomBtn.vue';
import InputNumber from '../input-number/InputNumber.vue';
import InputText from '../input-text/InputText.vue';

export default {
  name: 'ColorPicker',
  props: {
    name: String,
    color: {
      type: Object,
      default: () => ({ r: 70, g: 70, b: 220, a: 1 })
    },
    onChange: {
      type: Function,
      default: noop
    }
  },
  components: {
    MouseMove,
    CustomBtn,
    InputNumber,
    InputText,
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

      hexa: '4646dc',
      hsva: { h: 240, s: 68, v: 86, a: 1 }
    };
  },
  methods: {
    setColorAndPositionOfAlphaScaleTriangles(rgba) {
      const posX = this.alphaScale.clientWidth * rgba.a;
      this.alphaScaleTrianglesLeftPos = posX;
      this.alphaScaleTrianglesBgColor = (posX > this.alphaScale.clientWidth / 2) ? (255 / 3) > ((rgba.r + rgba.g + rgba.b) / 3) ? '#fff' : '#000' : '#000';
    },

    setCircleColorAndPosition(hsva) {
      this.circleLeftPos = hsva.s;
      this.circleTopPos = 100 - hsva.v;
      this.circleColor = (hsva.v < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
    },

    onMoveAlphaScale(x, y, node) {
      const alpha = +(x / node.clientWidth).toFixed(2);

      this.hsva.a = alpha;
      const rgba = { ...this.color, a: alpha };

      this.hexa = rgbToHex(rgba.r, rgba.g, rgba.b, alpha);
      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.onChange(rgba, this.name);
    },

    onMoveGradientBox(x, y, node) {
      const leftPos = (x / node.clientWidth) * 100;
      const topPos = (y / node.clientHeight) * 100;

      this.hsva.s = +leftPos.toFixed(0);
      this.hsva.v = 100 - +topPos.toFixed(0);

      const rgba = hsvToRgb(this.hsva.h, this.hsva.s, this.hsva.v, this.hsva.a);
      this.hexa = rgbToHex(rgba.r, rgba.g, rgba.b, rgba.a);

      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.setCircleColorAndPosition(this.hsva);
      this.onChange(rgba, this.name);
    },

    onMoveHueScale(x, y, node) {
      const pos = (y / node.clientHeight) * 100;

      const hue = Math.round(pos * 360 / 100);
      this.hsva.h = (hue === 360) ? 0 : hue;
      this.hueScaleTrianglesTopPos = pos;

      const rgba = hsvToRgb(this.hsva.h, this.hsva.s, this.hsva.v, this.hsva.a);
      this.hexa = rgbToHex(this.color.r, this.color.g, this.color.b, this.color.a);

      this.gradientBoxColor = hueToRgb(this.hsva.h);
      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.onChange(rgba, this.name);
    },

    onInputHexValue(value) {
      this.hexa = value.replace('#', '');

      if (isHex(this.hexa)) {
        const rgba = hexToRgb(this.hexa);
        this.hsva = rgbToHsv(rgba.r, rgba.g, rgba.b, rgba.a);

        this.gradientBoxColor = hueToRgb(this.hsva.h);
        this.setColorAndPositionOfAlphaScaleTriangles(rgba);
        this.setCircleColorAndPosition(this.hsva);
        this.onChange(rgba, this.name);
      }
    },

    onInputRgbValue(value, channel) {
      const rgba = { ...this.color, [channel]: value };

      this.hsva = rgbToHsv(rgba.r, rgba.g, rgba.b, rgba.a);
      this.hexa = rgbToHex(rgba.r, rgba.g, rgba.b, rgba.a);

      this.gradientBoxColor = hueToRgb(this.hsva.h);
      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.setCircleColorAndPosition(this.hsva);
      this.onChange(rgba, this.name);
    },

    onInputHsvValue(value, channel) {
      if (channel === 'h') {
        this.hsva[channel] = (value === 360) ? 0 : value;
        this.hueScaleTrianglesTopPos = Math.round((value / 360) * 100);
        this.gradientBoxColor = hueToRgb(this.hsva.h);
      }

      if (channel === 's') {
        this.hsva[channel] = value;
        this.circleLeftPos = value;
      }

      if (channel === 'v') {
        this.hsva[channel] = value;
        this.circleTopPos = 100 - value;
        this.circleColor = (value < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
      }

      if (channel === 'a') {
        this.hsva[channel] = value;
      }

      const rgba = hsvToRgb(this.hsva.h, this.hsva.s, this.hsva.v, this.hsva.a);
      this.hexa = rgbToHex(rgba.r, rgba.g, rgba.b, rgba.a);

      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.setCircleColorAndPosition(this.hsva);
      this.onChange(rgba, this.name);
    },

    onInputAlphaValue(value) {
      this.hsva.a = value;
      const rgba = { ...this.color, a: value };

      this.hexa = rgbToHex(rgba.r, rgba.g, rgba.b, value);
      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.onChange(rgba, this.name);
    },

    switchColorMode(colorMode, event) {
      this.activeColorMode = colorMode;
    }
  },

  mounted() {
    this.hsva = rgbToHsv(this.color.r, this.color.g, this.color.b, this.color.a);
    this.hexa = rgbToHex(this.color.r, this.color.g, this.color.b, this.color.a);

    this.hueScaleTrianglesTopPos = Math.round((this.hsva.h / 360) * 100);
    this.alphaScale = this.$refs.alphaScale.$el;
    this.gradientBox = this.$refs.gradientBox.$el;

    this.gradientBoxColor = hueToRgb(this.hsva.h);
    this.setColorAndPositionOfAlphaScaleTriangles(this.color);
    this.setCircleColorAndPosition(this.hsva);
  }
};
</script>

<template>
  <div class="color-picker">
    <mouse-move ref="alphaScale" class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient" :style="{ background: `linear-gradient(to left, rgb(${rgba.r}, ${rgba.g}, ${rgba.b}) 0%, transparent 100%)` }" />
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
      <input-number prefix="R" name="r" :value="rgba.r" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="G" name="g" :value="rgba.g" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="B" name="b" :value="rgba.b" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="A" name="a" :value="rgba.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="HEX" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HEX'" class="color-controls">
      <input-text prefix="HEX" :value="`#${hexa}`" :onInput="onInputHexValue" />
      <custom-btn iconClass="icon-back-forth" data="HSV" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HSV'" class="color-controls">
      <input-number prefix="H°" name="h" :value="hsva.h" :min="0" :max="360" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="S%" name="s" :value="hsva.s" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="V%" name="v" :value="hsva.v" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="A" name="a" :value="hsva.a" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="RGB" :onClick="switchColorMode" />
    </div>
  </div>
</template>

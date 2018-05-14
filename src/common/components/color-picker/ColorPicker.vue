<template>
  <div class="color-picker">
    <mouse-move ref="alphaScale" class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient" :style="{ background: `linear-gradient(to left, rgb(${color[0]}, ${color[1]}, ${color[2]}) 0%, transparent 100%)` }" />
      <i class="horizontal-triangles" :style="{ borderTopColor: alphaScaleTrianglesBgColor, borderBottomColor: alphaScaleTrianglesBgColor, left: `calc(${alphaScaleTrianglesLeftPos}px - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move ref="gradientBox" :styleCss="{ backgroundColor: `rgb(${gradientBoxColor[0]}, ${gradientBoxColor[1]}, ${gradientBoxColor[2]})` }" class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: circleColor, top: `calc(${circleTopPos}% - 4px)`, left: `calc(${circleLeftPos}% - 4px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${hueScaleTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div v-if="activeColorMode === 'RGB'" class="color-controls">
      <input-number prefix="R" :name="0" :value="color[0]" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="G" :name="1" :value="color[1]" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="B" :name="2" :value="color[2]" :min="0" :max="255" :step="1" :onInput="onInputRgbValue" />
      <input-number prefix="A" :name="3" :value="color[3]" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="HEX" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HEX'" class="color-controls">
      <input-text prefix="HEX" :value="`#${hexa}`" :onInput="onInputHexValue" />
      <custom-btn iconClass="icon-back-forth" data="HSV" :onClick="switchColorMode" />
    </div>

    <div v-if="activeColorMode === 'HSV'" class="color-controls">
      <input-number prefix="H°" :name="0" :value="hsva[0]" :min="0" :max="360" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="S%" :name="1" :value="hsva[1]" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="V%" :name="2" :value="hsva[2]" :min="0" :max="100" :step="1" :onInput="onInputHsvValue" />
      <input-number prefix="A" :name="3" :value="hsva[3]" :min="0" :max="1" :step="0.01" :onInput="onInputAlphaValue" />
      <custom-btn iconClass="icon-back-forth" data="RGB" :onClick="switchColorMode" />
    </div>
  </div>
</template>

<script>
import { noop } from '../../utils/base-helper';
import { hsvToRgb, rgbToHsv, rgbToHex, hexToRgb, hueToRgb, isHex } from '../../utils/color-converters';
import MouseMove from '../mouse-move/MouseMove.vue';
import CustomBtn from '../custom-btn/CustomBtn.vue';
import InputNumber from '../input-number/InputNumber.vue';
import InputText from '../input-text/InputText.vue';
import './color-picker.scss';

export default {
  name: 'ColorPicker',
  props: {
    name: { type: String, default: '' },
    сolorMode: { type: String, default: 'RGB' },
    color: { type: Array, default: () => [70, 70, 220, 1] }, // R.G.B.A
    onChange: { type: Function, default: noop }
  },
  components: {
    MouseMove,
    CustomBtn,
    InputNumber,
    InputText
  },
  data() {
    return {
      gradientBox: null,
      alphaScale: null,
      alphaScaleTrianglesLeftPos: 0,
      hueScaleTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
      activeColorMode: this.сolorMode,
      alphaScaleTrianglesBgColor: '#000',
      circleColor: '#000',
      gradientBoxColor: [0, 0, 255], // rgb
      hexa: '4646dc',
      hsva: [240, 68, 86, 1]
    };
  },
  watch: {
    color(value) {
      this.convertAndSetUpColorPicker(value);
    }
  },
  methods: {
    setColorAndPositionOfAlphaScaleTriangles(rgba) {
      const posX = this.alphaScale.clientWidth * rgba[3];
      this.alphaScaleTrianglesLeftPos = posX;
      this.alphaScaleTrianglesBgColor = (posX > this.alphaScale.clientWidth / 2) ? (255 / 3) > ((rgba[0] + rgba[1] + rgba[2]) / 3) ? '#fff' : '#000' : '#000';
    },

    setCircleColorAndPosition(hsva) {
      this.circleLeftPos = hsva[1];
      this.circleTopPos = 100 - hsva[2];
      this.circleColor = (hsva[2] < this.gradientBox.clientHeight / 4) ? '#fff' : '#000';
    },

    convertAndSetUpColorPicker(rgba) {
      this.hsva = rgbToHsv(...rgba);
      this.hexa = rgbToHex(...rgba);
      this.hueScaleTrianglesTopPos = Math.round((this.hsva[0] / 360) * 100);
      this.gradientBoxColor = hueToRgb(this.hsva[0]);
      this.setColorAndPositionOfAlphaScaleTriangles(rgba);
      this.setCircleColorAndPosition(this.hsva);
    },

    onMoveAlphaScale(x, y, node) {
      const alpha = +(x / node.clientWidth).toFixed(2);

      const rgba = [...this.color];
      rgba[3] = alpha;

      this.onChange(rgba, this.name);
    },

    onMoveGradientBox(x, y, node) {
      const leftPos = (x / node.clientWidth) * 100;
      const topPos = (y / node.clientHeight) * 100;

      this.hsva[1] = +leftPos.toFixed(0);
      this.hsva[2] = 100 - +topPos.toFixed(0);

      this.onChange(hsvToRgb(...this.hsva), this.name);
    },

    onMoveHueScale(x, y, node) {
      const pos = (y / node.clientHeight) * 100;

      const hue = Math.round(pos * 360 / 100);
      this.hsva[0] = (hue === 360) ? 0 : hue;

      this.onChange(hsvToRgb(...this.hsva), this.name);
    },

    onInputHexValue(value) {
      this.hexa = value.replace('#', '');
      if (isHex(this.hexa)) {
        this.onChange(hexToRgb(this.hexa), this.name);
      }
    },

    onInputRgbValue(value, channel) {
      const rgba = [...this.color];
      rgba[channel] = value;
      this.onChange(rgba, this.name);
    },

    onInputHsvValue(value, channel) {
      if (channel === 0) {
        this.hsva[0] = (value === 360) ? 0 : value;
      } else {
        this.hsva[channel] = value;
      }

      this.onChange(hsvToRgb(...this.hsva), this.name);
    },

    onInputAlphaValue(value) {
      const rgba = [...this.color];
      rgba[3] = value;

      this.onChange(rgba, this.name);
    },

    switchColorMode(colorMode, event) {
      this.activeColorMode = colorMode;
    }
  },
  mounted() {
    this.alphaScale = this.$refs.alphaScale.$el;
    this.gradientBox = this.$refs.gradientBox.$el;
    this.convertAndSetUpColorPicker(this.color);
  }
};
</script>

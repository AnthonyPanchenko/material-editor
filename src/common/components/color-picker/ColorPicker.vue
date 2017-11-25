<script>
import colorModelTypes from "../../constants/color-model-types";
import MouseMove from "../mouse-move/MouseMove.vue";
import CustomBtn from "../custom-btn/CustomBtn.vue";
import InputNumber from "../input-number/InputNumber.vue";
import InputText from "../input-text/InputText.vue";

export default {
  name: "ColorPicker",
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
      activeColorMode: colorModelTypes.RGB,
      hTrianglesLeftPos: 0,
      vTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
      hTrianglesBgColor: '#000',
      circleColor: '#000',
      colorModelTypes,
    };
  },
  methods: {
    onMoveAlphaScale(x, y, node) {
      this.hTrianglesLeftPos = (x / node.clientWidth) * 100;
      this.hTrianglesBgColor = x > node.clientWidth / 2 ? '#fff' : '#000';
    },
    onMoveGradientBox(x, y, node) {
      this.circleLeftPos = (x / node.clientWidth) * 100;
      this.circleTopPos = (y / node.clientHeight) * 100;
      this.circleColor = y > node.clientHeight / 2 ? '#fff' : '#000';
    },
    onMoveHueScale(x, y, node) {
      this.vTrianglesTopPos = (y / node.clientHeight) * 100;
    },
    switchToRgbColorMode() {
      this.activeColorMode = this.colorModelTypes.RGB;
    },
    switchToHexColorMode() {
      this.activeColorMode = this.colorModelTypes.HEX;
    },
    switchToHslColorMode() {
      this.activeColorMode = this.colorModelTypes.HSL;
    },
    switchToHsvColorMode() {
      this.activeColorMode = this.colorModelTypes.HSV;
    }
  }
};
</script>

<template>
  <div class="color-picker">
    <mouse-move class="alpha-scale" :onMove="onMoveAlphaScale">
      <span class="bg-gradient"></span>
      <i class="horizontal-triangle top" :style="{ borderTopColor: hTrianglesBgColor, left: `calc(${hTrianglesLeftPos}% - 5px)` }" />
      <i class="horizontal-triangle bottom" :style="{ borderBottomColor: hTrianglesBgColor, left: `calc(${hTrianglesLeftPos}% - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: circleColor, top: `calc(${circleTopPos}% - 4px)`, left: `calc(${circleLeftPos}% - 4px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${vTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div v-if="activeColorMode === colorModelTypes.RGB" class="color-controls">
      <input-number prefix="R" :value="77" :min="0" :max="255" :step="1" />
      <input-number prefix="G" :value="95" :min="0" :max="255" :step="1" />
      <input-number prefix="B" :value="124" :min="0" :max="255" :step="1" />
      <input-number prefix="A" :value="1" :min="0" :max="1" :step="0.1" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToHexColorMode" />
    </div>

    <div v-if="activeColorMode === colorModelTypes.HEX" class="color-controls">
      <input-text prefix="HEX" value="#4d5f7c" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToHsvColorMode" />
    </div>

    <div v-if="activeColorMode === colorModelTypes.HSV" class="color-controls">
      <input-number prefix="H°" :value="217" :min="0" :max="360" :step="1" />
      <input-number prefix="S%" :value="38" :min="0" :max="100" :step="1" />
      <input-number prefix="V%" :value="49" :min="0" :max="100" :step="1" />
      <input-number prefix="A" :value="1" :min="0" :max="1" :step="0.1" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToHslColorMode" />
    </div>

    <div v-if="activeColorMode === colorModelTypes.HSL" class="color-controls">
      <input-number prefix="H°" :value="217" :min="0" :max="360" :step="1" />
      <input-number prefix="S%" :value="23" :min="0" :max="100" :step="1" />
      <input-number prefix="L%" :value="40" :min="0" :max="100" :step="1" />
      <input-number prefix="A" :value="1" :min="0" :max="1" :step="0.1" />
      <custom-btn iconClass="icon-back-forth" :onClick="switchToRgbColorMode" />
    </div>
  </div>
</template>

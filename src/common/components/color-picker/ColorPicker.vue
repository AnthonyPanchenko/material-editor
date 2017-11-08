<script>
import MouseMove from "../mouse-move/MouseMove.vue";
import CustomBtn from "../custom-btn/CustomBtn.vue";
import InputNumber from "../input-number/InputNumber.vue";

export default {
  name: "ColorPicker",
  components: {
    MouseMove,
    CustomBtn,
    InputNumber,
  },
  props: {
    color: {
      type: Array,
      default: () => [255, 255, 255, 255]
    }
  },
  data() {
    return {
      hTrianglesLeftPos: 0,
      vTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
      hTrianglesBgColor: '#000',
      circleColor: '#000',
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

    <div class="color-controls">

    </div>
  </div>
</template>

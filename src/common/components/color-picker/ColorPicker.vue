<script>
import MouseMove from "../mouse-move/MouseMove.vue";

export default {
  name: "ColorPicker",
  components: {
    MouseMove,
  },
  props: {
    color: {
      type: Array,
      default: [255, 255, 255, 255]
    }
  },
  data() {
    return {
      hTrianglesLeftPos: 0,
      vTrianglesTopPos: 0,
      circleLeftPos: 0,
      circleTopPos: 0,
    };
  },
  methods: {
    onMoveAlphaScale(x, y, node) {
      this.hTrianglesLeftPos = (x / node.clientWidth) * 100;
    },
    onMoveGradientBox(x, y, node) {
      this.circleLeftPos = (x / node.clientWidth) * 100;
      this.circleTopPos = (y / node.clientHeight) * 100;
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
      <i class="horizontal-triangles" :style="{ left: `calc(${hTrianglesLeftPos}% - 5px)` }" />
    </mouse-move>

    <div class="container">
      <mouse-move class="gradient-box" :onMove="onMoveGradientBox">
        <i class="circle icon-radio-unchecked" :style="{ color: '#000', top: `calc(${circleTopPos}% - 5px)`, left: `calc(${circleLeftPos}% - 5px)` }" />
      </mouse-move>

      <mouse-move class="hue-scale" :onMove="onMoveHueScale">
        <i class="vertical-triangles" :style="{ top: `calc(${vTrianglesTopPos}% - 5px)` }" />
      </mouse-move>
    </div>

    <div class="color-controls"></div>
  </div>
</template>

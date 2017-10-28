<script>
import Drawing from "./utils/Drawing";

export default {
  name: "DrawingBoard",
  data() {
    return {
      board: new Drawing()
    };
  },
  methods: {
    onStartDraw() {
      this.board.startDraw();
    },
    onDraw(event) {
      this.board.draw(event);
    },
    onEndDraw() {
      this.board.endDraw();
    }
  },
  mounted() {
    this.board.init(this.$refs.canvasBoard);
  }
};
</script>

<template>
  <canvas ref="canvasBoard" v-on:mousedown="onStartDraw" v-on:mousemove="onDraw" v-on:mouseup="onEndDraw" width="800px" height="800px" />
</template>

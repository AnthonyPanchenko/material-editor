<script>
import Circle from './utils/Circle';

export default {
  name: 'CanvasBoard',
  data() {
    return {
      ctx: null,
      circles: [],
      canvasHeight: '1px',
      canvasWidth: '1px'
    }
  },
  methods: {
    setCanvasSize() {
      // to set value for obj need to use this.$set / this.$add
      this.canvasHeight = this.$refs.canvas.parentNode.clientHeight;
      this.canvasWidth = this.$refs.canvas.parentNode.clientWidth;
    },
    animate() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let i in this.circles) {
        this.circles[i].draw(this.ctx);
      }
      requestAnimationFrame(this.animate);
    },
    initAnimation() {
      for (let x = 0; x < this.canvasWidth * 0.5; x++) {
        this.circles.push(new Circle(this.canvasWidth, this.canvasHeight));
      }
      this.animate();
    }
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');

    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);

    this.initAnimation();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCanvasSize);
  }
}
</script>

<template>
  <div class="canvas-box">
    <canvas ref="canvas" v-bind:width="canvasWidth" v-bind:height="canvasHeight" />
  </div>
</template>
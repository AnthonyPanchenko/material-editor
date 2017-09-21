<script>
class Circle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    this.pos = {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 100,
    };

    this.alpha = 0.1 + Math.random() * 0.3;
    this.scale = 0.1 + Math.random() * 0.3;
    this.velocity = Math.random();
  }

  draw(ctx) {
    if (this.alpha <= 0) {
      this.init();
    }
    this.pos.y -= this.velocity;
    this.alpha -= 0.0005;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
    ctx.fill();
  }
};

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
  <canvas ref="canvas" v-bind:width="canvasWidth" v-bind:height="canvasHeight" />
</template>
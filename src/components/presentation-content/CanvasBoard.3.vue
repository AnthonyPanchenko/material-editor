<script>
export default {
  name: 'CanvasBoard',
  data() {
    return {
      mouse: {
        current: { x: 0, y: 0 },
        previous: { x: 0, y: 0 },
        down: false,
      }
    }
  },
  computed: {
    currentMouse() {
      const c = document.getElementById("canvas");
      const rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    }
  },
  methods: {
    scrollCheck() {
      if (document.body.scrollTop > height) {
        animateHeader = false;
      } else {
        animateHeader = true;
      }
    },

    resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    },

    animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (var i in circles) {
          circles[i].draw();
        }
      }
      requestAnimationFrame(animate);
    },

    draw(event) {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        const c = document.getElementById("canvas");
        const ctx = c.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);
        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = "#F63E02";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    handleMouseDown(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      const c = document.getElementById("canvas");
      const ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp() {
      this.mouse.down = false;
    },
    handleMouseMove(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY,
      };

      this.draw(event);
    }
  },
  ready() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);

    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
  },
}
</script>

<template>
  <canvas id="canvas" v-on:mousedown="handleMouseDown" v-on:mouseup="handleMouseUp" v-on:mousemove="handleMouseMove" width="800px" height="800px">
  </canvas>
</template>
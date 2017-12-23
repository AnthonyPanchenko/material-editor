<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec2Picker',
  props: {
    name: String,
    vector: {
      type: Array,
      default: () => [0, 0]
    },
    size: {
      type: Number,
      default: 200
    },
    onChange: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      ctx: null,
      canvas: null,
      isMouseDown: false,
      canvasOffsets: null,
      halfSize: this.size / 2
    };
  },
  methods: {
    drawAxes() {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 0.5;

      this.ctx.beginPath();
      this.ctx.moveTo(0, -this.halfSize);
      this.ctx.lineTo(0, this.halfSize);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(-this.halfSize, 0);
      this.ctx.lineTo(this.halfSize, 0);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    axesDesignation() {
      this.ctx.font = "9px Arial";
      this.ctx.fillStyle = '#fff';

      this.ctx.fillText("X", this.halfSize - 10, -5);
      this.ctx.fillText("-X", -this.halfSize + 5, 10);

      this.ctx.fillText("Y", -10, -this.halfSize + 10);
      this.ctx.fillText("-Y", 5, this.halfSize - 5);
    },

    drawGrid() {
      const sections = 20;
      const step = this.size / sections;

      this.ctx.beginPath();
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 0.2;

      for (let i = 0; i < sections; i++) {
        this.ctx.moveTo(-this.halfSize + step * i, -this.halfSize);
        this.ctx.lineTo(-this.halfSize + step * i, this.size);
        this.ctx.moveTo(-this.halfSize, -this.halfSize + step * i);
        this.ctx.lineTo(this.size, -this.halfSize + step * i);
      }

      this.ctx.stroke();
    },

    drawPoint(x, y) {
      y *= -1;

      this.ctx.beginPath();
      this.ctx.fillStyle = '#fff';
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 2.5]);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.restore();
    },

    draw(event) {
      this.ctx.clearRect(-this.halfSize, -this.halfSize, this.size, this.size);

      const currentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.size);
      const currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.size);

      const x = currentX - this.halfSize;
      const y = -1 * (currentY - this.halfSize) || 0;

      this.drawGrid();
      this.drawAxes();
      this.axesDesignation();
      this.drawPoint(x, y);
      this.onChange(x / this.halfSize, y / this.halfSize);
    },

    onMouseDown(event) {
      this.isMouseDown = true;
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.draw(event);
    },

    onMouseMove(event) {
      if (this.isMouseDown) {
        this.draw(event);
      }
    },

    onMouseUp() {
      this.isMouseDown = false;
    }
  },
  mounted() {
    this.canvas = this.$refs.vec2Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.halfSize, this.halfSize);

    this.drawGrid();
    this.drawAxes();
    this.axesDesignation();
    this.drawPoint(this.vector[0] * this.halfSize, this.vector[1] * this.halfSize);

    this.canvas.addEventListener('mousedown', event => this.onMouseDown(event));
    document.addEventListener('mousemove', event => this.onMouseMove(event));
    document.addEventListener('mouseup', event => this.onMouseUp(event));
  },
  beforeDestroy() {
    this.canvas.removeEventListener('mousedown', event => this.onMouseDown(event));
    document.removeEventListener('mousemove', event => this.onMouseMove(event));
    document.removeEventListener('mouseup', event => this.onMouseUp(event));
  }
};
</script>

<template>
  <canvas ref="vec2Picker" class="vec2-picker" :width="size" :height="size"></canvas>
</template>

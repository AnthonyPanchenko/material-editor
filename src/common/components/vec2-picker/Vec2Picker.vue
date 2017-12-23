<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import { vectorLength, normalizeVector } from '../../utils/vector';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec2Picker',
  props: {
    name: String,
    vector: [0, 0],
    onChange: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {
      canvas: null,
      canvasOffsets: null,
      ctx: null,

      isMouseDown: false,

      width: 200,
      height: 200
    };
  },
  methods: {
    drawAxes() {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 0.5;

      const halfWidth = 0.5 * this.width;
      const halfHeight = 0.5 * this.height;

      this.ctx.beginPath();
      this.ctx.moveTo(0, -halfHeight);
      this.ctx.lineTo(0, halfHeight);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(-halfWidth, 0);
      this.ctx.lineTo(halfWidth, 0);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    axesDesignation() {
      this.ctx.font = "9px Arial";
      this.ctx.fillStyle = '#fff';

      this.ctx.fillText("X", 0.5 * this.width - 10, -5);
      this.ctx.fillText("-X", -0.5 * this.width + 5, 10);

      this.ctx.fillText("Y", -10, -0.5 * this.height + 10);
      this.ctx.fillText("-Y", 5, 0.5 * this.height - 5);
    },

    drawGrid() {
      this.ctx.strokeStyle = '#000';
      this.ctx.beginPath();
      this.ctx.lineWidth = 0.2;

      const sections = 20;
      const step = this.width / sections;

      const startX = -0.5 * this.width;
      const startY = -0.5 * this.height;

      for (let i = 0; i < sections; i++) {
        this.ctx.moveTo(step * i + startY, startY);
        this.ctx.lineTo(step * i + startX, this.height);
        this.ctx.moveTo(startX, step * i + startX);
        this.ctx.lineTo(this.width, step * i + startX);
      }

      this.ctx.stroke();
    },

    drawPoint(x, y) {
      y *= -1;

      this.ctx.fillStyle = '#fff';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
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

    onMouseDown(event) {
      this.isMouseDown = true;
      this.canvasOffsets = getElementOffsets(this.canvas);

      this.ctx.clearRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);

      const x = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
      const y = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);

      const pointX = x - (this.width * 0.5);
      const pointY = -1 * (y - (this.height * 0.5));

      this.drawGrid();
      this.drawAxes();
      this.axesDesignation();
      this.drawPoint(pointX, pointY);
    },

    onMouseMove(event) {
      if (this.isMouseDown) {
        this.ctx.clearRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);

        const x = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
        const y = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);

        const pointX = x - (this.width * 0.5);
        const pointY = -1 * (y - (this.height * 0.5));

        this.drawGrid();
        this.drawAxes();
        this.axesDesignation();
        this.drawPoint(pointX, pointY);

        // const valueX = ((this.range / this.width) * currentX) - (this.range - this.max);
        // const valueY = ((this.range / this.height) * currentY) - (this.range - this.max);

        // const x = Math.round(((valueX - this.min) / this.range) * this.width);
        // const y = Math.round(((valueY - this.min) / this.range) * this.height);
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

    this.ctx.translate(this.width / 2, this.height / 2);

    this.drawGrid();
    this.drawAxes();
    this.axesDesignation();
    this.drawPoint(30, -30);

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
  <canvas ref="vec2Picker" class="vec2-picker" :width="width" :height="height"></canvas>
</template>

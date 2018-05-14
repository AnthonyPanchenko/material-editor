<template>
  <canvas ref="vec2Picker" class="vec2-picker" :width="dimension" :height="dimension" @mousedown="onMouseDown"></canvas>
</template>

<script>
import { noop, getElementOffsets } from '../../utils/base-helper';
import { roundNum, clamp } from '../../utils/math-helper';
import './vec2-picker.scss';

export default {
  name: 'Vec2Picker',
  props: {
    name: String,
    vector: { type: Array, default: () => [0.3, -0.5] }, // XY
    dimension: { type: Number, default: 230 },
    onChange: { type: Function, default: noop }
  },
  data() {
    return {
      ctx: null,
      canvas: null,
      isMouseDown: false,
      canvasOffsets: null,
      lineDash: [5, 2.5],
      halfSize: 0.5 * this.dimension
    };
  },
  watch: {
    vector(value) {
      this.draw(...value);
    }
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
      this.ctx.font = '9px Arial';
      this.ctx.fillStyle = '#fff';

      this.ctx.fillText('X', this.halfSize - 10, -5);
      this.ctx.fillText('-X', -this.halfSize + 5, 10);

      this.ctx.fillText('Y', -10, -this.halfSize + 10);
      this.ctx.fillText('-Y', 5, this.halfSize - 5);
    },
    drawGrid() {
      const sections = 20;
      const step = this.dimension / sections;

      this.ctx.beginPath();
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 0.2;

      for (let i = 0; i < sections; i++) {
        this.ctx.moveTo(-this.halfSize + step * i, -this.halfSize);
        this.ctx.lineTo(-this.halfSize + step * i, this.dimension);
        this.ctx.moveTo(-this.halfSize, -this.halfSize + step * i);
        this.ctx.lineTo(this.dimension, -this.halfSize + step * i);
      }

      this.ctx.stroke();
    },
    drawPoint(x, y) {
      y *= -1;

      this.ctx.beginPath();
      this.ctx.fillStyle = '#fff';
      this.ctx.arc(x, y, 2.3, 0, 2 * Math.PI, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash(this.lineDash);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.restore();
    },
    draw(x, y) {
      this.ctx.clearRect(-this.halfSize, -this.halfSize, this.dimension, this.dimension);
      this.drawGrid();
      this.drawAxes();
      this.axesDesignation();
      this.drawPoint(x * this.halfSize, y * this.halfSize);
    },
    getPositions(event) {
      const currentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.dimension);
      const currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.dimension);

      return [
        roundNum((currentX - this.halfSize) / this.halfSize),
        roundNum((-1 * (currentY - this.halfSize) || 0) / this.halfSize)
      ];
    },
    onMouseDown(event) {
      this.isMouseDown = true;
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.onChange(this.getPositions(event), this.name);
    },
    onMouseMove(event) {
      if (this.isMouseDown) {
        this.onChange(this.getPositions(event), this.name);
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
    this.draw(...this.vector);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
</script>

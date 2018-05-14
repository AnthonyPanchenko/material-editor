<template>
  <canvas ref="numberPicker" class="number-picker" :width="width" :height="height" @mousedown="onMouseDown"></canvas>
</template>

<script>
import { noop, getElementOffsets } from '../../utils/base-helper';
import { clamp } from '../../utils/math-helper';
import './number-picker.scss';

export default {
  name: 'NumberPicker',
  props: {
    name: String,
    value: { type: Number, default: 0 },
    min: { type: Number, default: Infinity },
    max: { type: Number, default: Infinity },
    step: { type: Number, default: 0.1 },
    width: { type: Number, default: 250 },
    height: { type: Number, default: 40 },
    onChange: { type: Function, default: noop }
  },
  data() {
    return {
      ctx: null,
      canvas: null,
      canvasOffsets: null,
      isMouseDown: false,
      halfHeight: this.height * 0.5,
      halfWidth: this.width * 0.5,
      tempValue: this.value,
      newValue: this.value,
      startX: 0,
      lastDifferenceX: 0,
      commonDifferenceX: 0,
      verticalLines: 40,
      sections: 40 * 3,
      color: '#000'
    };
  },
  methods: {
    drawHorizontalLine() {
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0.5 + this.halfHeight);
      this.ctx.lineTo(this.width, 0.5 + this.halfHeight);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawTriangles() {
      this.ctx.fillStyle = this.color;

      this.ctx.beginPath();
      this.ctx.moveTo(this.halfWidth, 5);
      this.ctx.lineTo(this.halfWidth - 5, 0);
      this.ctx.lineTo(this.halfWidth + 5, 0);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(this.halfWidth, this.height - 5);
      this.ctx.lineTo(this.halfWidth - 5, this.height);
      this.ctx.lineTo(this.halfWidth + 5, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    },
    countPosX(posX) {
      return (Math.abs(posX - this.halfWidth) > this.halfWidth)
        ? ((posX - this.halfWidth) % this.halfWidth) + this.width
        : posX;
    },
    conuntLineHeight(index) {
      return (index % (this.verticalLines / 2) === 0)
        ? this.height * 0.33
        : (index % (this.verticalLines / 4) === 0)
          ? this.height * 0.25
          : this.height * 0.13;
    },
    drawLineScale() {
      const step = this.width / this.verticalLines;

      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 1.1;

      for (let i = 0; i < this.sections; i++) {
        const lineHeight = this.conuntLineHeight(i);
        const linePosX = (i * step) - this.countPosX(this.commonDifferenceX);
        this.ctx.beginPath();
        this.ctx.moveTo(linePosX, this.halfHeight - lineHeight);
        this.ctx.lineTo(linePosX, this.halfHeight + lineHeight);
        this.ctx.stroke();
      }
    },
    onMouseDown(event) {
      this.isMouseDown = true;
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.startX = event.pageX - this.canvasOffsets.left;
    },
    onMouseMove(event) {
      if (this.isMouseDown) {
        const currentDifferenceX = (event.pageX - this.canvasOffsets.left) - this.startX;

        const currentValue = +(this.step * currentDifferenceX + this.tempValue).toFixed(5);
        this.newValue = clamp(currentValue, this.min, this.max);

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.commonDifferenceX = -1 * currentDifferenceX + this.lastDifferenceX;
        this.drawTriangles();
        this.drawHorizontalLine();
        this.drawLineScale();

        this.onChange(this.newValue, this.name, this.min, this.max, this.step);
      }
    },
    onMouseUp() {
      this.isMouseDown = false;
      this.tempValue = this.newValue;
      this.lastDifferenceX = this.commonDifferenceX;
    }
  },
  mounted() {
    this.canvas = this.$refs.numberPicker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.drawTriangles();
    this.drawHorizontalLine();
    this.drawLineScale();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
</script>

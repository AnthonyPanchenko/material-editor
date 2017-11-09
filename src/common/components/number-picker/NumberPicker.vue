<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'NumberPicker',
  props: {
    name: String,
    value: Number,
    min: Number,
    max: Number,
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
      width: 0,
      height: 0,
      startPosX: 0,
      lastDifferenceX: 0,
      commonDifferenceX: 0,
      verticalLines: 40,
      step: 0,
      sections: 0,
      color: '#000'
    };
  },
  methods: {
    onChangeNumberPicker() {
      this.onChange(this.value, this.name, this.min, this.max, this.step);
    },
    drawHorizontalLine() {
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0.5 + (this.height * 0.5));
      this.ctx.lineTo(this.width, 0.5 + (this.height * 0.5));
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawTriangles() {
      this.ctx.fillStyle = this.color;

      this.ctx.beginPath();
      this.ctx.moveTo(this.width * 0.5, 5);
      this.ctx.lineTo((this.width * 0.5) - 5, 0);
      this.ctx.lineTo((this.width * 0.5) + 5, 0);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(this.width * 0.5, this.height - 5);
      this.ctx.lineTo((this.width * 0.5) - 5, this.height);
      this.ctx.lineTo((this.width * 0.5) + 5, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    },
    countPosX(posX) {
      const halfWidth = this.width / 2;

      return (Math.abs(posX - halfWidth) > halfWidth)
        ? ((posX - halfWidth) % halfWidth) + this.width
        : posX;
    },
    conuntLineHeight(index) {
      return (index % (this.verticalLines / 2) === 0)
        ? this.height * 0.35
        : (index % (this.verticalLines / 4) === 0)
          ? this.height * 0.25
          : this.height * 0.13;
    },
    drawLineScale(posX) {
      this.ctx.strokeStyle = this.color;
      this.ctx.beginPath();
      this.ctx.lineWidth = 1.1;

      for (let i = 0; i < this.sections; i++) {
        const lineHeight = this.conuntLineHeight(i);
        const lineXposition = (i * this.step) - this.countPosX(posX);
        this.ctx.moveTo(lineXposition, (this.height * 0.5) - lineHeight);
        this.ctx.lineTo(lineXposition, (this.height * 0.5) + lineHeight);
      }

      this.ctx.stroke();
    },
    onMouseDown(event) {
      this.isMouseDown = true;
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.startPosX = event.pageX - this.canvasOffsets.left;
    },
    onMouseMove(event) {
      if (this.isMouseDown) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const currentDifferenceX = this.startPosX - (event.pageX - this.canvasOffsets.left);
        const commonDifferenceX = this.lastDifferenceX + currentDifferenceX;
        this.commonDifferenceX = commonDifferenceX;

        this.drawTriangles();
        this.drawHorizontalLine();
        this.drawLineScale(commonDifferenceX);
      }
    },
    onMouseUp() {
      this.isMouseDown = false;
      this.lastDifferenceX = this.commonDifferenceX;
    }
  },
  mounted() {
    this.canvas = this.$refs.numberPicker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.step = this.width / this.verticalLines;
    this.sections = this.verticalLines * 3;

    this.drawTriangles();
    this.drawHorizontalLine();
    this.drawLineScale(0);

    this.canvas.addEventListener('mousedown', event => this.onMouseDown(event));
    this.canvas.addEventListener('mousemove', event => this.onMouseMove(event));
    document.addEventListener('mouseup', event => this.onMouseUp(event));
  },
  beforeDestroy() {
    this.canvas.removeEventListener('mousedown', event => this.onMouseDown(event));
    this.canvas.removeEventListener('mousemove', event => this.onMouseMove(event));
    document.removeEventListener('mouseup', event => this.onMouseUp(event));
  }
};
</script>

<template>
  <canvas ref="numberPicker" class="number-picker" width="250" height="40"></canvas>
</template>

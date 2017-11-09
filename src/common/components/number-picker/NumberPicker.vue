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
    step: Number,
    prefix: [String, Number],
    sufix: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: noop
    }
  },
  methods: {
    onChangeInputNumber(event) {
      if (!this.disabled) {
        this.onChange(this.value, this.name, this.min, this.max, this.step);
      }
    }
  },
  mounted() {
    this.$refs.inpNumber.addEventListener('mousewheel', noop);
  },
  beforeDestroy() {
    this.$refs.inpNumber.removeEventListener('mousewheel', noop);
  },
};

class NumberPicker {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasOffsetLeft = getElementOffsets(canvas).left;
    this.ctx = canvas.getContext('2d');

    this.isMouseDown = false;

    this.width = canvas.width;
    this.height = canvas.height;

    this.startPosX = 0;

    this.lastDifferenceX = 0;
    this.commonDifferenceX = 0;

    this.verticalLines = 40;
    this.step = this.width / this.verticalLines;
    this.sections = this.verticalLines * 3;

    this.color = '#000';
  }

  drawHorizontalLine() {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0.5 + (this.height * 0.5));
    this.ctx.lineTo(this.width, 0.5 + (this.height * 0.5));
    this.ctx.closePath();
    this.ctx.stroke();
  }

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
  }

  countPosX(posX) {
    const halfWidth = this.width / 2;

    return (Math.abs(posX - halfWidth) > halfWidth)
      ? ((posX - halfWidth) % halfWidth) + this.width
      : posX;
  }

  conuntLineHeight(index) {
    return (index % (this.verticalLines / 2) === 0)
      ? this.height * 0.35
      : (index % (this.verticalLines / 4) === 0)
        ? this.height * 0.25
        : this.height * 0.13;
  }

  drawLineScale(posX) {
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();

    for (let i = 0; i < this.sections; i++) {
      const lineHeight = this.conuntLineHeight(i);
      const lineXposition = (i * this.step) - this.countPosX(posX);
      this.ctx.moveTo(lineXposition, (this.height * 0.5) - lineHeight);
      this.ctx.lineTo(lineXposition, (this.height * 0.5) + lineHeight);
    }

    this.ctx.stroke();
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    this.canvasOffsetLeft = getElementOffsets(this.canvas).left;
    this.startPosX = event.pageX - this.canvasOffsetLeft;
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const currentDifferenceX = this.startPosX - (event.pageX - this.canvasOffsetLeft);
      const commonDifferenceX = this.lastDifferenceX + currentDifferenceX;
      this.commonDifferenceX = commonDifferenceX;

      this.drawTriangles();
      this.drawHorizontalLine();
      this.drawLineScale(commonDifferenceX);
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.lastDifferenceX = this.commonDifferenceX;
  }

  init() {
    this.drawTriangles();
    this.drawHorizontalLine();
    this.drawLineScale(0);
  }
}

{/* window.onload = function () {
  const canvas = document.querySelector('.canvas-board');
  const floatPicker = new FloatPicker(canvas);

  canvas.addEventListener('mousedown', (e) => floatPicker.onMouseDown(e));
  canvas.addEventListener('mousemove', (e) => floatPicker.onMouseMove(e));
  document.addEventListener('mouseup', (e) => floatPicker.onMouseUp(e));

  floatPicker.init();
} */}

</script>

<template>
  <canvas class="canvas-board" width="250" height="40"></canvas>
</template>
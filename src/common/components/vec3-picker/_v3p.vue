<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import { getRotationXMatrix, getRotationYMatrix, multiplyMatrices, multiplyMatrixByVector, getInverseMatrix } from '../../utils/matrix';
import { vectorLength, normalizeVector } from '../../utils/vector';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec3Picker',
  props: {
    name: String,
    vector: [0, 0, 0],
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

      isShiftPress: false,
      isMouseDown: false,
      isMouseDownOnPoint: false,

      viewMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
      center: [0, 0, 0],

      width: 400,
      height: 400,

      pointVector: [0, 0, 0],

      pointX: 20,
      pointY: -25,

      currentX: 0,
      currentY: 0,

      previousX: 0,
      previousY: 0,

      thetaX: 0.35,
      thetaY: -0.35,

      dx: 0,
      dy: 0,

      x: 0,
      y: 0
    };
  },
  methods: {
    drawAxis(adgesVector, adgesTextVector, axisName) {
      const adgeTextVector = multiplyMatrixByVector(this.viewMatrix, adgesTextVector);
      const egdeVector = multiplyMatrixByVector(this.viewMatrix, adgesVector);

      this.ctx.fillText(axisName, adgeTextVector[0], -1 * adgeTextVector[1]);
      this.ctx.save();
      this.ctx.strokeStyle = '#000';
      this.ctx.beginPath();
      this.ctx.moveTo(this.center[0], -1 * this.center[1]);
      this.ctx.lineTo(egdeVector[0], -1 * egdeVector[1]);
      this.ctx.stroke();
      this.ctx.restore();
    },

    drawPoint() {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 2.5]);
      this.ctx.moveTo(this.center[0], -1 * this.center[1]);
      this.ctx.lineTo(this.pointVector[0], -1 * this.pointVector[1]);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(this.pointVector[0], -1 * this.pointVector[1], 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },

    drawAxes() {
      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#fff';

      const edgeLength = (this.width / 2) - 40;
      const edgeLengthWithIndent = edgeLength + 10;

      this.drawAxis([edgeLength, 0, 0], [edgeLengthWithIndent, 0, 0], 'X');
      this.drawAxis([-edgeLength, 0, 0], [-edgeLengthWithIndent, 0, 0], '-X');
      this.drawAxis([0, edgeLength, 0], [0, edgeLengthWithIndent, 0], 'Y');
      this.drawAxis([0, -edgeLength, 0], [0, -edgeLengthWithIndent, 0], '-Y');
      this.drawAxis([0, 0, edgeLength], [0, 0, edgeLengthWithIndent], 'Z');
      this.drawAxis([0, 0, -edgeLength], [0, 0, -edgeLengthWithIndent], '-Z');
    },

    onMouseDown(event) {
      this.canvasOffsets = getElementOffsets(this.canvas);

      if (this.isShiftPress) {
        this.isMouseDownOnPoint = true;
      } else {
        this.isMouseDown = true;
      }
    },

    onMouseMove(event) {
      if (this.isMouseDownOnPoint || this.isMouseDown) {
        this.currentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
        this.currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);

        if (this.isMouseDownOnPoint) {
          this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

          this.drawAxes();

          this.pointX = this.currentX - (this.width / 2);
          this.pointY = this.currentY - (this.height / 2);

          const inversMatrix = getInverseMatrix(this.viewMatrix);
          this.pointVector = multiplyMatrixByVector(inversMatrix, [this.pointX, -this.pointY, 0]);

          this.drawPoint();
        }

        if (this.isMouseDown) {
          this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

          const normalizedX = this.currentX / this.width;
          const normalizedY = this.currentY / this.height;

          if (this.previousX && this.previousY) {
            this.dx = normalizedX - this.previousX;
            this.dy = normalizedY - this.previousY;
          }

          this.previousX = normalizedX;
          this.previousY = normalizedY;

          this.x += this.dx;
          this.y += this.dy;

          this.thetaX = this.y * Math.PI;
          this.thetaY = this.x * Math.PI;

          this.viewMatrix = multiplyMatrices(getRotationXMatrix(this.thetaX), getRotationYMatrix(this.thetaY));
          this.drawAxes();

          this.pointVector = multiplyMatrixByVector(this.viewMatrix, [this.pointX, this.pointY, 0]);
          this.drawPoint();
        }
      }
    },

    onMouseUp() {
      this.isMouseDown = false;
      this.isMouseDownOnPoint = false;
      this.previousX = 0;
      this.previousY = 0;
    },

    onKeyDown(e) {
      if (e.keyCode === 16) {
        this.isShiftPress = true;
      }
    },

    onKeyUp(e) {
      if (e.keyCode === 16) {
        this.isShiftPress = false;
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.vec3Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.width / 2, this.height / 2);

    this.viewMatrix = multiplyMatrices(getRotationXMatrix(this.thetaX), getRotationYMatrix(this.thetaY));
    this.drawAxes();

    this.pointVector = multiplyMatrixByVector(this.viewMatrix, [this.pointX, this.pointY, 0]);
    this.drawPoint();

    this.canvas.addEventListener('mousedown', event => this.onMouseDown(event));
    document.addEventListener('mousemove', event => this.onMouseMove(event));
    document.addEventListener('mouseup', event => this.onMouseUp(event));

    document.addEventListener('keydown', event => this.onKeyDown(event));
    document.addEventListener('keyup', event => this.onKeyUp(event));
  },
  beforeDestroy() {
    this.canvas.removeEventListener('mousedown', event => this.onMouseDown(event));
    document.removeEventListener('mousemove', event => this.onMouseMove(event));
    document.removeEventListener('mouseup', event => this.onMouseUp(event));

    document.removeEventListener('keydown', event => this.onKeyDown(event));
    document.removeEventListener('keyup', event => this.onKeyUp(event));
  }
};
</script>

<template>
  <canvas ref="vec3Picker" class="vec3-picker" :width="width" :height="height"></canvas>
</template>

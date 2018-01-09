<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import { multiplyMatrixByVector, getInverseMatrix, getViewMatrix } from '../../utils/matrix';
import { vectorLength, normalizeVector } from '../../utils/vector';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec3Picker',
  props: {
    name: String,
    dimension: {
      type: Number,
      default: 200
    },
    vector: {
      type: Array,
      default: () => [67, 55, -35]
    },
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

      isPressedSpace: false,

      rotationSpeed: 0.01,
 
      isMouseDown: false,

      viewMatrix: [],
      inversMatrix: [],

      width: this.dimension,
      height: this.dimension,

      edgeLength: 0.5 * this.dimension - 15,
      edgeIndent: 0.5 * this.dimension - 10,
 
      pointVector: this.vector,

      pointX: 0,
      pointY: 0,

      thetaX: 0.512,
      thetaY: -0.464,

      dx: 0.512,
      dy: -0.464,

      startX: 0,
      startY: 0
    };
  },
  methods: {
    drawAxis(adgesVector, adgesTextVector, axisName) {
      const edgeTextVector = multiplyMatrixByVector(this.viewMatrix, adgesTextVector);
      const egdeVector = multiplyMatrixByVector(this.viewMatrix, adgesVector);

      this.ctx.fillText(axisName, edgeTextVector[0], -1 * edgeTextVector[1]);
      this.ctx.save();
      this.ctx.strokeStyle = '#000';
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(egdeVector[0], -1 * egdeVector[1]);
      this.ctx.stroke();
      this.ctx.restore();
    },

    drawAxes() {
      this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#fff';

      this.drawAxis([this.edgeLength, 0, 0], [this.edgeIndent, 0, 0], 'X');
      this.drawAxis([-this.edgeLength, 0, 0], [-this.edgeIndent, 0, 0], '-X');
      this.drawAxis([0, this.edgeLength, 0], [0, this.edgeIndent, 0], 'Y');
      this.drawAxis([0, -this.edgeLength, 0], [0, -this.edgeIndent, 0], '-Y');
      this.drawAxis([0, 0, this.edgeLength], [0, 0, this.edgeIndent], 'Z');
      this.drawAxis([0, 0, -this.edgeLength], [0, 0, -this.edgeIndent], '-Z');
    },

    drawPoint(x, y) {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 2.5]);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x, -1 * y);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(x, -1 * y, 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },

    onMovePoint(x, y) {
      if (!this.isPressedSpace) {
        this.drawAxes();

        const pointX = x - this.dimension * 0.5;
        const pointY = -1 * (y - this.dimension * 0.5) || 0;

        this.pointVector = multiplyMatrixByVector(this.inversMatrix, [pointX, pointY, 0]);
        const newPointVec = multiplyMatrixByVector(this.viewMatrix, this.pointVector);

        this.drawPoint(newPointVec[0], newPointVec[1]);
      }
    },

    onMouseDown(event) {
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.isMouseDown = true;

      this.startX = event.pageX - this.canvasOffsets.left;
      this.startY = event.pageY - this.canvasOffsets.top;

      this.onMovePoint(this.startX, this.startY);
    },

    onMouseMove(event) {
      if (this.isMouseDown) {
        const x = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
        const y = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);

        this.onMovePoint(x, y);

        if (this.isPressedSpace) {
          this.thetaX = this.rotationSpeed * (y - this.startY) + this.dx;
          this.thetaY = this.rotationSpeed * (x - this.startX) + this.dy;

          this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
          const newPointVec = multiplyMatrixByVector(this.viewMatrix, this.pointVector);

          this.drawAxes();
          this.drawPoint(newPointVec[0], newPointVec[1]);
        }
      }
    },

    onMouseUp() {
      this.isMouseDown = false;
      this.dx = this.thetaX;
      this.dy = this.thetaY;
    },

    onKeyDown(e) {
      if (e.keyCode === 32) {
        this.isPressedSpace = true;
      }
    },

    onKeyUp(e) {
      if (e.keyCode === 32) {
        this.isPressedSpace = false;
        this.inversMatrix = getInverseMatrix(this.viewMatrix);
      }
    }
  },

  mounted() {
    this.canvas = this.$refs.vec3Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.width / 2, this.height / 2);

    this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
    const newPointVec = multiplyMatrixByVector(this.viewMatrix, this.pointVector);

    this.drawAxes();
    this.drawPoint(newPointVec[0], newPointVec[1]);

    this.inversMatrix = getInverseMatrix(this.viewMatrix);

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

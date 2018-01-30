<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import { multiplyMatrixByVector, getInverseMatrix, getViewMatrix, matrices } from '../../utils/matrix';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec3Picker',
  props: {
    name: String,
    dimension: { type: Number, default: 230 },
    vector: { type: Array, default: () => [0.67, 0.55, -0.35] },
    onChange: { type: Function, default: noop }
  },
  data() {
    return {
      canvas: null,
      canvasOffsets: null,
      ctx: null,
      rotationSpeed: 0.01,
      isMouseOverPoint: false,
      isMouseDownOnCoordsSystem: false,
      viewMatrix: matrices.mat3,
      inversMatrix: matrices.mat3,
      width: this.dimension,
      height: this.dimension,
      limitVal: 0.5 * this.dimension,
      edgeLength: 0.5 * this.dimension - 15,
      edgeIndent: 0.5 * this.dimension - 10,
      localVector: [0, 0, 0], // relative to the coordinate system (not normalized)
      tempVector: [], // temporary
      viewVector: [0, 0, 0], //relative to the canvas view (not normalized)
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
      this.ctx.font = '9px Arial';

      this.drawAxis([this.edgeLength, 0, 0], [this.edgeIndent, 0, 0], 'X');
      this.drawAxis([-this.edgeLength, 0, 0], [-this.edgeIndent, 0, 0], '-X');
      this.drawAxis([0, this.edgeLength, 0], [0, this.edgeIndent, 0], 'Y');
      this.drawAxis([0, -this.edgeLength, 0], [0, -this.edgeIndent, 0], '-Y');
      this.drawAxis([0, 0, this.edgeLength], [0, 0, this.edgeIndent], 'Z');
      this.drawAxis([0, 0, -this.edgeLength], [0, 0, -this.edgeIndent], '-Z');
    },
    drawPoint() {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5.3, 2.7]);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.pointX, -1 * this.pointY);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(this.pointX, -1 * this.pointY, 2.3, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },
    getLocalCoords(curentX, currentY) {
      return {
        x: curentX - this.dimension * 0.5,
        y: -1 * (currentY - this.dimension * 0.5) || 0,
      }
    },
    setMouseDownBy(curentX, currentY) {
      const pointCoords = this.getLocalCoords(curentX, currentY);
      const num = Math.sqrt((this.pointX - pointCoords.x) ** 2 + (this.pointY - pointCoords.y) ** 2);

      if (num <= 3.5) {
        this.isMouseOverPoint = true;
      } else {
        this.isMouseDownOnCoordsSystem = true;
      }
    },
    onMovePoint(curentX, currentY) {
      this.drawAxes();

      const pointCoords = this.getLocalCoords(curentX, currentY);
      const inversViewVector = multiplyMatrixByVector(this.inversMatrix, [pointCoords.x, pointCoords.y, this.viewVector[2]]);
      this.tempVector = inversViewVector.map(cord => clamp(cord, -this.limitVal, this.limitVal));
      const newViewVector = multiplyMatrixByVector(this.viewMatrix, this.tempVector);

      this.pointX = newViewVector[0];
      this.pointY = newViewVector[1];
      this.drawPoint();

      const nVector = this.tempVector.map(v => v / this.limitVal);
      this.onChange(nVector[0], nVector[1], nVector[2], this.name);
    },
    onRotateCoordinateSystem(curentX, currentY) {
      this.thetaX = this.rotationSpeed * (currentY - this.startY) + this.dx;
      this.thetaY = this.rotationSpeed * (curentX - this.startX) + this.dy;

      this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
      this.viewVector = multiplyMatrixByVector(this.viewMatrix, this.localVector);

      this.pointX = this.viewVector[0];
      this.pointY = this.viewVector[1];

      this.drawAxes();
      this.drawPoint();
    },
    onMouseDown(event) {
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.startX = event.pageX - this.canvasOffsets.left;
      this.startY = event.pageY - this.canvasOffsets.top;
      this.setMouseDownBy(this.startX, this.startY);
    },
    onMouseMove(event) {
      if (this.isMouseDownOnCoordsSystem || this.isMouseOverPoint) {
        const curentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
        const currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);

        if (this.isMouseDownOnCoordsSystem) {
          this.onRotateCoordinateSystem(curentX, currentY);
        }

        if (this.isMouseOverPoint) {
          this.onMovePoint(curentX, currentY);
        }
      }
    },
    onMouseUp() {
      this.isMouseOverPoint = false;
      this.isMouseDownOnCoordsSystem = false;
      this.dx = this.thetaX;
      this.dy = this.thetaY;
      this.localVector = this.tempVector;
      this.inversMatrix = getInverseMatrix(this.viewMatrix);
    }
  },
  mounted() {
    const normalizedVector = this.vector.map(v => v * this.limitVal);
    this.localVector = normalizedVector;
    this.tempVector = normalizedVector;

    this.canvas = this.$refs.vec3Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.width / 2, this.height / 2);

    this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
    this.viewVector = multiplyMatrixByVector(this.viewMatrix, this.localVector);

    this.pointX = this.viewVector[0];
    this.pointY = this.viewVector[1];

    this.drawAxes();
    this.drawPoint();

    this.inversMatrix = getInverseMatrix(this.viewMatrix);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
};
</script>

<template>
  <canvas ref="vec3Picker" class="vec3-picker" :width="width" :height="height" @mousedown="onMouseDown"></canvas>
</template>

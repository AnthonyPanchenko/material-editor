<template>
  <canvas ref="vec3Picker" class="vec3-picker" :width="dimension" :height="dimension" @mousedown="onMouseDown"></canvas>
</template>

<script>
import { noop, getElementOffsets } from '../../utils/base-helper';
import { roundNum, clamp, multiplyMatrixByVector, getInverseMatrix, getViewMatrix, matrices } from '../../utils/math-helper';
import './vec3-picker.scss';

export default {
  name: 'Vec3Picker',
  props: {
    name: String,
    dimension: { type: Number, default: 230 },
    vector: { type: Array, default: () => [0.67, 0.55, -0.35] }, // XYZ
    onChange: { type: Function, default: noop }
  },
  data() {
    return {
      canvas: null,
      canvasOffsets: null,
      ctx: null,
      axes: [],
      rotationSpeed: 0.01,
      isMouseOverPoint: false,
      isMouseDownOnCoordsSystem: false,
      viewMatrix: matrices.mat3,
      inversMatrix: matrices.mat3,
      halfSize: 0.5 * this.dimension,
      lineDash: [5.3, 2.7],
      localVector: [0, 0, 0], // relative to the coordinate system (not normalized)
      tempVector: [], // temporary
      viewVector: [0, 0, 0], // relative to the canvas view (not normalized)
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
  watch: {
    vector(value) {
      this.drawAxes();

      const newViewVector = multiplyMatrixByVector(this.viewMatrix, value.map(v => v * this.halfSize));
      this.pointX = newViewVector[0];
      this.pointY = newViewVector[1];

      this.drawPoint();
    }
  },
  methods: {
    getAxes() {
      const edgeLength = this.halfSize - 15;
      const edgeIndent = this.halfSize - 10;

      return [
        { edge: [edgeLength, 0, 0], textIndent: [edgeIndent, 0, 0], text: 'X' },
        { edge: [-edgeLength, 0, 0], textIndent: [-edgeIndent, 0, 0], text: '-X' },
        { edge: [0, edgeLength, 0], textIndent: [0, edgeIndent, 0], text: 'Y' },
        { edge: [0, -edgeLength, 0], textIndent: [0, -edgeIndent, 0], text: '-Y' },
        { edge: [0, 0, edgeLength], textIndent: [0, 0, edgeIndent], text: 'Z' },
        { edge: [0, 0, -edgeLength], textIndent: [0, 0, -edgeIndent], text: '-Z' }
      ];
    },
    drawAxis(egdeVector, edgeTextVector, axisName) {
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
      this.ctx.clearRect(-this.halfSize, -this.halfSize, this.dimension, this.dimension);

      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '9px Arial';

      for (let i = 0; i < this.axes.length; i++) {
        const edgeTextVector = multiplyMatrixByVector(this.viewMatrix, this.axes[i].textIndent);
        const egdeVector = multiplyMatrixByVector(this.viewMatrix, this.axes[i].edge);
        this.drawAxis(egdeVector, edgeTextVector, this.axes[i].text);
      }
    },
    drawPoint() {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash(this.lineDash);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.pointX, -1 * this.pointY);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(this.pointX, -1 * this.pointY, 2.3, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },
    getLocalCoords(curentX, currentY) {
      return [curentX - this.dimension * 0.5, -1 * (currentY - this.dimension * 0.5) || 0];
    },
    setMouseDownBy(curentX, currentY) {
      const pointCoords = this.getLocalCoords(curentX, currentY);
      const num = Math.sqrt((this.pointX - pointCoords[0]) ** 2 + (this.pointY - pointCoords[1]) ** 2);

      if (num <= 3.5) {
        this.isMouseOverPoint = true;
      } else {
        this.isMouseDownOnCoordsSystem = true;
      }
    },
    onMovePoint(curentX, currentY) {
      const inversViewVector = multiplyMatrixByVector(this.inversMatrix, [...this.getLocalCoords(curentX, currentY), this.viewVector[2]]);
      this.tempVector = inversViewVector.map(cord => clamp(cord, -this.halfSize, this.halfSize));

      this.onChange(this.tempVector.map(v => roundNum(v / this.halfSize)), this.name);
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
        const curentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.dimension);
        const currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.dimension);

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
    this.axes = this.getAxes();
    const vector = this.vector.map(v => v * this.halfSize);
    this.localVector = vector;
    this.tempVector = vector;

    this.canvas = this.$refs.vec3Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.halfSize, this.halfSize);

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

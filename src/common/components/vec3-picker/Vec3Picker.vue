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
    vector: [0, 0, 0],
    dimension: {
      type: Number,
      default: 400
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

      rotationSpeed: 0.008,

      isMouseDown: false,

      viewMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],

      width: this.dimension,
      height: this.dimension,

      edgeLength: 0.5 * this.dimension - 40,
      edgeIndent: 0.5 * this.dimension - 30,

      pointVector: [0, 0, 0],

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

      // const z = this.rotationSpeed * 200 / this.edgeLength;
      // const sx = egdeVector[0] *  * 100;
      // const sy = egdeVector[1] * z * 100;

      // const z = this.rotationSpeed * 200 / this.edgeLength;
      const z = egdeVector[2];
      const sx = egdeVector[0] * z / (this.rotationSpeed * this.edgeLength);
      const sy = egdeVector[1] * z / (this.rotationSpeed * this.edgeLength);

      // const sx = egdeVector[0] * 200 / (egdeVector[2] + 200);
      // const sy = (-1 * egdeVector[1]) * 200 / (egdeVector[2] + 200);

      console.log([egdeVector[0], egdeVector[1]]);

      console.log([sx, sy]);
      console.log('================================');

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

    drawPoint() {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 2.5]);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.pointVector[0], -1 * this.pointVector[1]);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(this.pointVector[0], -1 * this.pointVector[1], 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },

    onMouseDown(event) {
      this.canvasOffsets = getElementOffsets(this.canvas);
      this.isMouseDown = true;

      this.startX = event.pageX - this.canvasOffsets.left;
      this.startY = event.pageY - this.canvasOffsets.top;
    },

    onMouseMove(event) {
      if (this.isMouseDown) {
        this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

        const x = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
        const y = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);


        const ex = x - this.dimension * 0.5;
        const ey = -1 * (y - this.dimension * 0.5) || 0;


        // this.edgeLength == Z dist


        console.clear();
        console.log(ex);
        console.log(ey);

        this.thetaX = this.rotationSpeed * (y - this.startY) + this.dx;
        this.thetaY = this.rotationSpeed * (x - this.startX) + this.dy;

        this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
        this.drawAxes();
      }
    },

    onMouseUp() {
      this.isMouseDown = false;
      this.dx = this.thetaX;
      this.dy = this.thetaY;
    }
  },

  mounted() {
    this.canvas = this.$refs.vec3Picker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.translate(this.width / 2, this.height / 2);

    this.viewMatrix = getViewMatrix(this.thetaX, this.thetaY);
    this.drawAxes();
    this.drawPoint();

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
  <canvas ref="vec3Picker" class="vec3-picker" :width="width" :height="height"></canvas>
</template>

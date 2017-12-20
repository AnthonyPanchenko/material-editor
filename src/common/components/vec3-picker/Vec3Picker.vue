<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import getElementOffsets from '../../utils/getElementOffsets';

export default {
  name: 'Vec3Picker',
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
      canvas = canvas;
      canvasOffsets = getElementOffsets(canvas);
      ctx = canvas.getContext('2d');

      isShiftPress = false;
      isMouseDown = false;
      isMouseDownOnPoint = false;

      width = canvas.width;
      height = canvas.height;

      pointVector =[0, 0, 0];
      newPointVector =[0, 0, 0];

      pointX = 20;
      pointY = -25;

      currentX = 0;
      currentY = 0;

      previousX = 0;
      previousY = 0;

      thetaX = 0.35;
      thetaY = -0.35;

      dx = 0;
      dy = 0;

      x = 0;
      y = 0;
    };
  },
  methods: {
    drawAxis(center, matrix, adgesVector, adgesTextVector, axisName) {
      const adgeTextVector = multiplyVector(matrix, adgesTextVector);
      const egdeVector = multiplyVector(matrix, adgesVector);

      this.ctx.fillText(axisName, adgeTextVector[0], -1 * adgeTextVector[1]);
      this.ctx.save();
      this.ctx.strokeStyle = '#000';
      this.ctx.beginPath();
      this.ctx.moveTo(center[0], -1 * center[1]);
      this.ctx.lineTo(egdeVector[0], -1 * egdeVector[1]);
      this.ctx.stroke();
      this.ctx.restore();
    },

    drawPoint(center, x, y) {
      this.ctx.save();
      this.ctx.strokeStyle = '#08c';
      this.ctx.beginPath();
      this.ctx.setLineDash([5, 2.5]);
      this.ctx.moveTo(center[0], -1 * center[1]);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },

    drawAxes(center, matrix) {
      this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#fff';

      const edgeLength = (this.width / 2) - 40;
      const edgeLengthWithIndent = edgeLength + 10;

      this.drawAxis(center, matrix, [edgeLength, 0, 0], [edgeLengthWithIndent, 0, 0], 'X');
      this.drawAxis(center, matrix, [-edgeLength, 0, 0], [-edgeLengthWithIndent, 0, 0], '-X');
      this.drawAxis(center, matrix, [0, edgeLength, 0], [0, edgeLengthWithIndent, 0], 'Y');
      this.drawAxis(center, matrix, [0, -edgeLength, 0], [0, -edgeLengthWithIndent, 0], '-Y');
      this.drawAxis(center, matrix, [0, 0, edgeLength], [0, 0, edgeLengthWithIndent], 'Z');
      this.drawAxis(center, matrix, [0, 0, -edgeLength], [0, 0, -edgeLengthWithIndent], '-Z');
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
          const matrix = multiplyMatrix(rotationX(this.thetaX), rotationY(this.thetaY));
          const center = multiplyVector(matrix, [0, 0, 0]);

          this.drawAxes(center, matrix);

          this.pointX = this.currentX - (this.width / 2);
          this.pointY = this.currentY - (this.height / 2);

          const inversMatrix = getInverseMatrix(matrix);
          const resultVector = multiplyVector(inversMatrix, [this.pointX, -this.pointY, 0]);
          // this.pointVector = multiplyVector(matrix, resultVector);
          // const ector = multiplyVectorByScalar(resultVector, 2);

          // const aVec = addVectors(this.newPointVector, resultVector);
          // const bVec = subVectors(multiplyVectors(this.newPointVector, resultVector), this.newPointVector);

          this.pointVector = subVectors(resultVector, [this.newPointVector[0], -1 * this.newPointVector[1], this.newPointVector[2]]);
          console.clear();
          // console.log('X > ', this.pointX);
          // console.log('Y > ', this.pointY);
          console.log(this.pointVector);
          console.log('============================');

          // this.pointVector = resultVector;

          // const dist = 10;
          // const x = resultVector[0];
          // const y = resultVector[1];
          // const z = resultVector[2];

          // const sx = this.width / 2 + x * dist / (z + dist);
          // const sy = this.height / 2 - y * dist / (z + dist);

          // const sz = (this.height / 2);

          // const sx = (x * sz) / this.width;

          // const sy = (y * sz) / this.height;

          // console.log();
          // console.log(this.pointX);
          // console.log('=======================================');

          this.drawPoint(center, this.pointVector[0], -1 * this.pointVector[1]);
        }

        if (this.isMouseDown) {
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

          const matrix = multiplyMatrix(rotationX(this.thetaX), rotationY(this.thetaY));
          const center = multiplyVector(matrix, [0, 0, 0]);

          this.drawAxes(center, matrix);

          // const pointVectorPos = multiplyVector(matrix, [this.pointX, this.pointY, 0]);
          // this.drawPoint(center, pointVectorPos[0], -1 * pointVectorPos[1]);
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
    this.canvas = this.$refs.numberPicker;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ctx.translate(this.width / 2, this.height / 2);

    const matrix = multiplyMatrix(rotationX(this.thetaX), rotationY(this.thetaY));
    const center = multiplyVector(matrix, [0, 0, 0]);
    this.drawAxes(center, matrix);

    this.pointVector = multiplyVector(matrix, [this.pointX, this.pointY, 0]);
    this.newPointVector = multiplyVector(matrix, [this.pointX, this.pointY, 0]);
    this.drawPoint(center, this.pointVector[0], -1 * this.pointVector[1]);


    const canvas = document.querySelector('.canvas-board');
    const vec3Picker = new Vec3Picker(canvas);

    canvas.addEventListener('mousedown', (e) => vec3Picker.onMouseDown(e));
    document.addEventListener('keydown', (e) => vec3Picker.onKeyDown(e));
    document.addEventListener('keyup', (e) => vec3Picker.onKeyUp(e));
    document.addEventListener('mousemove', (e) => vec3Picker.onMouseMove(e));
    document.addEventListener('mouseup', (e) => vec3Picker.onMouseUp(e));

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

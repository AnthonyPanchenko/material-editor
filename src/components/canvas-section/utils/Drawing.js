import getElementOffsets from '../../../common/utils/getElementOffsets';

class Drawing {
  constructor() {
    this.ctx = null;
    this.canvas = null;
    this.canvasOffset = null;
    this.brushСolor = '#F63E02';
    this.previousPos = { x: 0, y: 0 };
    this.isMouseDown = false;
  }

  startDraw() {
    this.isMouseDown = true;
  }

  draw(event) {
    if (this.isMouseDown) {
      const currentX = event.pageX - this.canvasOffset.left;
      const currentY = event.pageY - this.canvasOffset.top;

      if (this.previousPos.x && this.previousPos.y && (currentX !== this.previousPos.x || currentY !== this.previousPos.y)) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#F63E02';
        this.ctx.moveTo(this.previousPos.x, this.previousPos.y);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
      }

      this.previousPos.x = currentX;
      this.previousPos.y = currentY;
    }
  }

  endDraw() {
    this.isMouseDown = false;
    this.previousPos.x = 0;
    this.previousPos.y = 0;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  init(canvas) {
    this.canvas = canvas;
    this.canvasOffset = getElementOffsets(canvas);
    this.ctx = canvas.getContext('2d');
  }
}

export default Drawing;

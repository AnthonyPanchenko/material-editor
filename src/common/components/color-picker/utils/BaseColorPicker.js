class BaseColorPicker {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.ctx = canvas.getContext("2d");

    this.currentX = 0;
    this.currentY = 0;

    this.isMouseDown = false;

    this.width = canvas.width;
    this.height = canvas.height;
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setPositions(event) {
    this.currentX = clamp(event.pageX - this.canvasOffsets.left, 0, this.width);
    this.currentY = clamp(event.pageY - this.canvasOffsets.top, 0, this.height);
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    this.canvasOffsets = getElementOffsets(this.canvas);
    this.setPositions(event);
    this.clearRect();
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      event.preventDefault();
      this.setPositions(event);
      this.clearRect();
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  get color() {
    return this.ctx.getImageData(this.currentX, this.currentY, 1, 1).data;
  }
}

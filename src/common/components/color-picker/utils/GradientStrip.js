class GradientStrip extends CoanvasColorPicker {
  constructor(canvas) {
    super(canvas);
    this.hue = [[255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255], [255, 0, 0]];
  }

  drawTriangles(y) {
    this.ctx.fillStyle = '#000';

    this.ctx.beginPath();
    this.ctx.moveTo(5, y);
    this.ctx.lineTo(0, y - 5);
    this.ctx.lineTo(0, y + 5);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width - 5, y);
    this.ctx.lineTo(this.width, y - 5);
    this.ctx.lineTo(this.width, y + 5);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawGradient() {
    const arrColorsLength = this.hue.length - 1;
    const gradient = this.ctx.createLinearGradient(this.width / 2, this.height, this.width / 2, 0);

    for (var i = 0; i <= arrColorsLength; i++) {
      gradient.addColorStop(i * (1 / arrColorsLength), `rgb(${this.hue[i][0]}, ${this.hue[i][1]}, ${this.hue[i][2]})`);
    };

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  setCurrentColor() {
    this.currentColor = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},1)`;

    console.log(this.currentColor);
  }

  onMouseDown(event) {
    super.onMouseDown(event);

    this.drawGradient();
    this.setCurrentColor();
    this.drawTriangles(this.currentY);
  }

  onMouseMove(event) {
    super.onMouseMove(event);

    if (this.isMouseDown) {
      this.drawGradient();
      this.setCurrentColor();
      this.drawTriangles(this.currentY);
    }
  }

  init() {
    this.drawGradient();
    this.drawTriangles(20);
  }
}

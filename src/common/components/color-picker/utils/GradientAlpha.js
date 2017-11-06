class GradientAlpha extends CoanvasColorPicker {
  constructor(canvas) {
    super(canvas);

    this.step = 34;
    this.squareWidth = this.width / this.step;
    this.totalSquares = Math.pow(this.step, 2);

    this.light = '#fafafa';
    this.dark = '#cdcdcd';

    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  drawTriangles(x) {
    this.ctx.fillStyle = x > this.width / 2 ? '#fff' : '#000';

    this.ctx.beginPath();
    this.ctx.moveTo(x, 5);
    this.ctx.lineTo(x - 5, 0);
    this.ctx.lineTo(x + 5, 0);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(x, this.height - 5);
    this.ctx.lineTo(x - 5, this.height);
    this.ctx.lineTo(x + 5, this.height);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawBackground() {
    let x, y = -1;

    for (let i = 0; i < this.totalSquares; i++) {
      x++;
      if (i % this.step == 0) {
        y++;
        x = 0;
      }

      this.ctx.beginPath();
      this.ctx.rect(x * this.squareWidth, y * this.squareWidth, this.squareWidth, this.squareWidth);
      this.ctx.fillStyle = (x + y) % 2 ? this.dark : this.light;
      this.ctx.fillRect(x * this.squareWidth, y * this.squareWidth, this.squareWidth, this.squareWidth);
    }
  }

  drawGradient() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);

    gradient.addColorStop(0, `rgba(${this.r},${this.g},${this.b},0)`);
    gradient.addColorStop(1, `rgba(${this.r},${this.g},${this.b},1)`);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  get alpha() {
    return (1 / 100) * Math.round((this.currentX / this.width) * 100);
  }

  onMouseDown(event) {
    super.onMouseDown(event);

    console.log(this.alpha.toFixed(2));
    this.drawBackground();
    this.drawGradient();
    this.drawTriangles(this.currentX);
  }

  onMouseMove(event) {
    super.onMouseMove(event);

    if (this.isMouseDown) {
      console.log(this.alpha.toFixed(2));
      this.drawBackground();
      this.drawGradient();
      this.drawTriangles(this.currentX);
    }
  }

  init() {
    this.drawBackground();
    this.drawGradient();
    this.drawTriangles(195);
  }
}

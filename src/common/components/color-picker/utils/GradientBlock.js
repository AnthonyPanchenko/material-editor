class GradientBlock extends CoanvasColorPicker {
  drawCirclePicker(x, y) {
    this.ctx.strokeStyle = y > this.height / 2 ? '#fff' : '#000';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3.5, 0, 2 * Math.PI, false);
    this.ctx.stroke();
  }

  drawGradient() {
    this.ctx.rect(0, 0, this.width, this.height);

    this.ctx.fillStyle = 'rgba(255,0,0,1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const white = this.ctx.createLinearGradient(0, 0, this.width, 0);
    white.addColorStop(0, 'rgba(255,255,255,1)');
    white.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = white;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const black = this.ctx.createLinearGradient(0, 0, 0, this.height);
    black.addColorStop(0, 'rgba(0,0,0,0)');
    black.addColorStop(1, 'rgba(0,0,0,1)');

    this.ctx.fillStyle = black;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  setCurrentColor() {
    this.currentColor = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},1)`;

    console.log(this.currentColor);
    console.log('x=', this.currentX, 'Y=', this.currentY);
  }

  onMouseDown(event) {
    super.onMouseDown(event);

    this.drawGradient();
    this.setCurrentColor();
    this.drawCirclePicker(this.currentX, this.currentY);
  }

  onMouseMove(event) {
    super.onMouseMove(event);

    if (this.isMouseDown) {
      this.drawGradient();
      this.setCurrentColor();
      this.drawCirclePicker(this.currentX, this.currentY);
    }
  }

  init() {
    this.currentX = 1;
    this.currentY = 1;
    this.drawGradient();
    this.setCurrentColor();
    this.drawCirclePicker(this.currentX, this.currentY);
  }
}

import BaseColorPicker from './BaseColorPicker';

class AlphaScale extends BaseColorPicker {
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

  get alpha() {
    return (1 / 100) * Math.round((this.currentX / this.width) * 100);
  }

  onMouseDown(event) {
    super.onMouseDown(event);

    console.log(this.alpha.toFixed(2));
  }

  onMouseMove(event) {
    super.onMouseMove(event);

    if (this.isMouseDown) {
      console.log(this.alpha.toFixed(2));
    }
  }
}

export default AlphaScale;

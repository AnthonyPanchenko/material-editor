import clamp from '../../../utils/clamp';
import getElementOffsets from '../../../utils/getElementOffsets';

class BaseColorPicker {
  constructor() {
    this.element = null;
    this.offsets = null;

    this.currentX = 0;
    this.currentY = 0;

    this.isMouseDown = false;

    this.width = 0;
    this.height = 0;
  }

  setPositions(event) {
    this.currentX = clamp(event.pageX - this.offsets.left, 0, this.width);
    this.currentY = clamp(event.pageY - this.offsets.top, 0, this.height);
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    this.offsets = getElementOffsets(this.element);

    this.setPositions(event);
  }

  onMouseMove(event) {
    if (this.isMouseDown) {
      event.preventDefault();
      this.setPositions(event);
    }
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  init(element) {
    this.offsets = getElementOffsets(element);
    this.width = element.clientWidth;
    this.height = element.clientHeight;
    this.element = element;
  }
}

export default BaseColorPicker;

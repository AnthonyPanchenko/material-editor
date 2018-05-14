<template>
  <transition name="fade">
    <div class="popover" ref="popover">
      <span :class="['triangle', triangleClassName]" ref="triangle" />
      <slot>Content here</slot>
    </div>
  </transition>
</template>

<script>
import { noop, getElementOffsets } from '../../utils/base-helper';
import { clamp } from '../../utils/math-helper';
import './popover.scss';

/*
                   top-center
            top-left    |     top-right
                   |    |    |
      left-top --- |\\\\\\\\\| --- right-top
   left-center --- |/////////| --- right-center
   left-bottom --- |\\\\\\\\\| --- right-bottom
                   |    |    |
         bottom-left    |     bottom-right
                  bottom-center
*/

const orientationsList = {
  top: ['center', 'left', 'right'],
  bottom: ['center', 'left', 'right'],
  left: ['center', 'top', 'bottom'],
  right: ['center', 'top', 'bottom']
};

const opositPositions = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

export default {
  name: 'Popover',
  props: {
    position: { type: String, default: 'top' },
    closeByItselfClick: { type: Boolean, default: false },
    onClose: { type: Function, default: noop },
    orientation: { type: String, default: 'center' },
    trigger: null
  },
  data() {
    return {
      popover: null,
      triangle: null,
      indent: 3,
      opositPositions,
      orientationsList,
      triangleClassName: opositPositions[this.position],
      currentOrientation: this.orientation,
      currentPosition: this.position,
      popoverOffsets: {
        left: 0,
        top: 0
      },
      bestFitPositions: {
        top: false,
        bottom: false,
        left: false,
        right: false
      }
    };
  },
  methods: {
    getNewOrientation(position, currentOrientation) {
      const orientations = this.orientationsList[position];
      return orientations.indexOf(currentOrientation) !== -1 ? currentOrientation : orientations[0];
    },
    getNewPosition(bestFitPositions, position) {
      let definedPosition = position;
      const opositPos = this.opositPositions[position];

      if (bestFitPositions[opositPos]) {
        definedPosition = opositPos;
      } else {
        for (const pos in bestFitPositions) {
          if (bestFitPositions[pos]) {
            definedPosition = pos;
            break;
          }
        }
      }

      return definedPosition;
    },
    defineHorizontalOrientation(triggerOffsets) {
      if (this.currentOrientation === 'left') {
        this.popoverOffsets.left = clamp((this.trigger.offsetWidth + triggerOffsets.left) - this.popover.offsetWidth, 0, window.innerWidth - this.popover.offsetWidth);
      }

      if (this.currentOrientation === 'center') {
        this.popoverOffsets.left = clamp(((this.trigger.offsetWidth / 2) + triggerOffsets.left) - (this.popover.offsetWidth / 2), 0, window.innerWidth - this.popover.offsetWidth);
      }

      if (this.currentOrientation === 'right') {
        this.popoverOffsets.left = clamp(triggerOffsets.left, 0, window.innerWidth - this.popover.offsetWidth);
      }
    },
    defineVerticalOrientation(triggerOffsets) {
      if (this.currentOrientation === 'top') {
        this.popoverOffsets.top = clamp(triggerOffsets.top, 0, window.innerHeight - this.popover.offsetHeight);
      }

      if (this.currentOrientation === 'center') {
        this.popoverOffsets.top = clamp(((this.trigger.offsetHeight / 2) + triggerOffsets.top) - this.popover.offsetHeight / 2, 0, window.innerHeight - this.popover.offsetHeight);
      }

      if (this.currentOrientation === 'bottom') {
        this.popoverOffsets.top = clamp((triggerOffsets.top - this.popover.offsetHeight) + this.trigger.offsetHeight, 0, window.innerHeight - this.popover.offsetHeight);
      }
    },
    definePopoverOffsetsByPlacement(triggerOffsets) {
      if (this.currentPosition === 'bottom') {
        this.popoverOffsets.top = triggerOffsets.top + this.trigger.offsetHeight + this.triangle.offsetHeight + this.indent;
        this.defineHorizontalOrientation(triggerOffsets);
      }

      if (this.currentPosition === 'top') {
        this.popoverOffsets.top = triggerOffsets.top - this.popover.offsetHeight - this.triangle.offsetHeight - this.indent;
        this.defineHorizontalOrientation(triggerOffsets);
      }

      if (this.currentPosition === 'left') {
        this.popoverOffsets.left = triggerOffsets.left - this.popover.offsetWidth - this.triangle.offsetWidth - this.indent;
        this.defineVerticalOrientation(triggerOffsets);
      }

      if (this.currentPosition === 'right') {
        this.popoverOffsets.left = triggerOffsets.left + this.triangle.offsetWidth + this.trigger.offsetWidth + this.indent;
        this.defineVerticalOrientation(triggerOffsets);
      }
    },
    getTrianglePositionTop(triggerOffsets) {
      return ((triggerOffsets.top - this.popoverOffsets.top) + (this.trigger.offsetHeight / 2)) - (this.triangle.offsetHeight / 2);
    },
    getTrianglePositionLeft(triggerOffsets) {
      return ((triggerOffsets.left - this.popoverOffsets.left) + (this.trigger.offsetWidth / 2)) - (this.triangle.offsetWidth / 2);
    },
    observeBestFitPosition(triggerOffsets) {
      this.bestFitPositions.left = (triggerOffsets.left - (this.popover.offsetWidth + this.triangle.offsetWidth)) >= 0;
      this.bestFitPositions.top = (triggerOffsets.top - (this.popover.offsetHeight + this.triangle.offsetHeight)) >= 0;
      this.bestFitPositions.right = (window.innerWidth - (triggerOffsets.left + this.trigger.offsetWidth + this.popover.offsetWidth + this.triangle.offsetWidth)) >= 0;
      this.bestFitPositions.bottom = (window.innerHeight - (triggerOffsets.top + this.trigger.offsetHeight + this.popover.offsetHeight + this.triangle.offsetHeight)) >= 0;
    },
    observePosition() {
      const triggerOffsets = getElementOffsets(this.trigger);
      this.observeBestFitPosition(triggerOffsets);

      if (!this.bestFitPositions[this.currentPosition]) {
        const newPosition = this.getNewPosition(this.bestFitPositions, this.currentPosition);
        const newOrientation = this.getNewOrientation(newPosition, this.currentOrientation);

        this.currentOrientation = newOrientation;
        this.currentPosition = newPosition;

        this.triangleClassName = this.opositPositions[newPosition];
      }

      if (this.bestFitPositions[this.position]) {
        this.currentOrientation = this.orientation;
        this.currentPosition = this.position;

        this.triangleClassName = this.opositPositions[this.position];
      }

      this.definePopoverOffsetsByPlacement(triggerOffsets);

      if ((this.currentPosition === 'left') || (this.currentPosition === 'right')) {
        this.triangle.style.left = null;
        this.triangle.style.top = `${this.getTrianglePositionTop(triggerOffsets)}px`;
      }

      if ((this.currentPosition === 'top') || (this.currentPosition === 'bottom')) {
        this.triangle.style.top = null;
        this.triangle.style.left = `${this.getTrianglePositionLeft(triggerOffsets)}px`;
      }

      this.popover.style.top = `${this.popoverOffsets.top}px`;
      this.popover.style.left = `${this.popoverOffsets.left}px`;
    },
    onClosePopover(event) {
      if (this.trigger && this.trigger.contains(event.target)) {
        return;
      }

      if (!this.closeByItselfClick && event) {
        if (this.popover && !this.popover.contains(event.target)) {
          this.onClose();
        }
      } else {
        this.onClose();
      }
    }
  },
  mounted() {
    this.popover = this.$refs.popover;
    this.triangle = this.$refs.triangle;

    if (this.trigger && Object.keys(this.trigger).length) {
      this.observePosition();
    }

    document.addEventListener('mousedown', this.onClosePopover);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.onClosePopover);
  }
};
</script>

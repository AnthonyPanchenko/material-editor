<script>
import noop from '../../utils/noop';
import clamp from '../../utils/clamp';
import getElementOffsets from '../../utils/getElementOffsets';

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

const emptyObj = noop;

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
    isOpen: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom'
    },
    orientation: {
      type: String,
      default: 'left'
    },
    closeByItselfClick: {
      type: Boolean,
      default: false
    },
    refToTrigger: {
      type: Object,
      default: emptyObj
    }
  },
  data() {
    return {
      trigger: null,
      popover: null,
      triangle: null,

      indent: 3,

      currentOrientation: orientation,
      currentPosition: position,

      popoverOffsets: {
        left: 0,
        top: 0
      },

      triggerOffsets: {
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
        for (let pos in bestFitPositions) {
          if (bestFitPositions[pos]) {
            definedPosition = pos;
            break;
          }
        }
      }

      return definedPosition;
    },

    definePopoverOffsetsByPlacement() {
      switch (this.currentPlacement) {
        case 'bottom-left':
          this.popoverOffsets.left = clamp((this.trigger.offsetWidth + this.triggerOffsets.left) - this.popover.offsetWidth, 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top + this.trigger.offsetHeight + this.triangle.offsetHeight + this.indent;
          break;

        case 'bottom-center':
          this.popoverOffsets.left = clamp(((this.trigger.offsetWidth / 2) + this.triggerOffsets.left) - (this.popover.offsetWidth / 2), 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top + this.trigger.offsetHeight + this.triangle.offsetHeight + this.indent;
          break;

        case 'bottom-right':
          this.popoverOffsets.left = clamp(this.triggerOffsets.left, 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top + this.trigger.offsetHeight + this.triangle.offsetHeight + this.indent;
          break;

        case 'top-left':
          this.popoverOffsets.left = clamp((this.trigger.offsetWidth + this.triggerOffsets.left) - this.popover.offsetWidth, 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top - this.popover.offsetHeight - this.triangle.offsetHeight - this.indent;
          break;

        case 'top-center':
          this.popoverOffsets.left = clamp(((this.trigger.offsetWidth / 2) + this.triggerOffsets.left) - (this.popover.offsetWidth / 2), 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top - this.popover.offsetHeight - this.triangle.offsetHeight - this.indent;
          break;

        case 'top-right':
          this.popoverOffsets.left = clamp(this.triggerOffsets.left, 0, window.innerWidth - this.popover.offsetWidth);
          this.popoverOffsets.top = this.triggerOffsets.top - this.popover.offsetHeight - this.triangle.offsetHeight - this.indent;
          break;

        case 'left-top':
          this.popoverOffsets.left = this.triggerOffsets.left - this.popover.offsetWidth - this.triangle.offsetWidth - this.indent;
          this.popoverOffsets.top = clamp(this.triggerOffsets.top, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        case 'left-center':
          this.popoverOffsets.left = this.triggerOffsets.left - this.popover.offsetWidth - this.triangle.offsetWidth - this.indent;
          this.popoverOffsets.top = clamp(((this.trigger.offsetHeight / 2) + this.triggerOffsets.top) - this.popover.offsetHeight / 2, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        case 'left-bottom':
          this.popoverOffsets.left = this.triggerOffsets.left - this.popover.offsetWidth - this.triangle.offsetWidth - this.indent;
          this.popoverOffsets.top = clamp((this.triggerOffsets.top - this.popover.offsetHeight) + this.trigger.offsetHeight, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        case 'right-top':
          this.popoverOffsets.left = this.triggerOffsets.left + this.triangle.offsetWidth + this.trigger.offsetWidth + this.indent;
          this.popoverOffsets.top = clamp(this.triggerOffsets.top, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        case 'right-center':
          this.popoverOffsets.left = this.triggerOffsets.left + this.triangle.offsetWidth + this.trigger.offsetWidth + this.indent;
          this.popoverOffsets.top = clamp(((this.trigger.offsetHeight / 2) + this.triggerOffsets.top) - this.popover.offsetHeight / 2, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        case 'right-bottom':
          this.popoverOffsets.left = this.triggerOffsets.left + this.triangle.offsetWidth + this.trigger.offsetWidth + this.indent;
          this.popoverOffsets.top = clamp((this.triggerOffsets.top - this.popover.offsetHeight) + this.trigger.offsetHeight, 0, window.innerHeight - this.popover.offsetHeight);
          break;

        default: this.popoverOffsets;
      }
    },

    getTrianglePositionTop() {
      return ((this.triggerOffsets.top - this.popoverOffsets.top) + (this.trigger.offsetHeight / 2)) - (this.triangle.offsetHeight / 2);
    },

    getTrianglePositionLeft() {
      return ((this.triggerOffsets.left - this.popoverOffsets.left) + (this.trigger.offsetWidth / 2)) - (this.triangle.offsetWidth / 2);
    },

    observeBestFitPosition() {
      this.bestFitPositions.left = (this.triggerOffsets.left - (this.popover.offsetWidth + this.triangle.offsetWidth)) >= 0;
      this.bestFitPositions.top = (this.triggerOffsets.top - (this.popover.offsetHeight + this.triangle.offsetHeight)) >= 0;
      this.bestFitPositions.right = (window.innerWidth - (this.triggerOffsets.left + this.trigger.offsetWidth + this.popover.offsetWidth + this.triangle.offsetWidth)) >= 0;
      this.bestFitPositions.bottom = (window.innerHeight - (this.triggerOffsets.top + this.trigger.offsetHeight + this.popover.offsetHeight + this.triangle.offsetHeight)) >= 0;
    },

    observe() {
      this.triggerOffsets = getElementOffsets(this.trigger);
      this.observeBestFitPosition();

      const splitedPlacement = this.currentPlacement.split('-');
      const currentPosition = splitedPlacement[0];
      const currentOrientation = splitedPlacement[1];

      if (!this.bestFitPositions[currentPosition]) {
        this.triangle.classList.remove(this.opositPositions[currentPosition]);
        const newPosition = this.getNewPosition(this.bestFitPositions, currentPosition);
        const newOrientation = this.getNewOrientation(newPosition, currentOrientation);
        this.currentPlacement = `${newPosition}-${newOrientation}`;
        this.triangle.classList.add(this.opositPositions[newPosition]);
      }

      if (this.bestFitPositions[this.defaultPosition]) {
        this.triangle.classList.remove(this.opositPositions[currentPosition]);
        this.currentPlacement = this.defaultPlacement;
        this.triangle.classList.add(this.opositPositions[this.defaultPosition]);
      }

      this.definePopoverOffsetsByPlacement();
      this.popover.style.top = this.popoverOffsets.top + 'px';
      this.popover.style.left = this.popoverOffsets.left + 'px';

      if ((currentPosition === 'left') || (currentPosition === 'right')) {
        this.triangle.style.left = null;
        this.triangle.style.top = this.getTrianglePositionTop() + 'px';
      }

      if ((currentPosition === 'top') || (currentPosition === 'bottom')) {
        this.triangle.style.top = null;
        this.triangle.style.left = this.getTrianglePositionLeft() + 'px';
      }
    },

    init() {
      const currentPosition = this.currentPlacement.split('-')[0];
      this.triggerOffsets = getElementOffsets(this.trigger);

      this.triangle.classList.add(this.opositPositions[currentPosition]);
      this.definePopoverOffsetsByPlacement();

      // this.popover.style.top = this.popoverOffsets.top + 'px';
      // this.popover.style.left = this.popoverOffsets.left + 'px';

      if ((currentPosition === 'left') || (currentPosition === 'right')) {
        this.triangle.style.top = this.getTrianglePositionTop() + 'px';
      }

      if ((currentPosition === 'top') || (currentPosition === 'bottom')) {
        this.triangle.style.left = this.getTrianglePositionLeft() + 'px';
      }
    }

  }
};

// window.onload = function () {
//   let grab = false;
//   let startOffsets = {};

//   const trigger = document.querySelector('.trigger');
//   const popover = document.querySelector('.popover');
//   const triangle = document.querySelector('.triangle');

//   const popoverAutoPosition = new PopoverAutoPosition(trigger, popover, triangle);
//   popoverAutoPosition.init();

//   const startEventActions = (e) => {
//     e.preventDefault();
//     const triggerOffsets = getElementOffsets(trigger);
//     const mousePos = getClientPositions(e);

//     startOffsets = {
//       left: mousePos.posX - triggerOffsets.left,
//       top: mousePos.posY - triggerOffsets.top,
//     };

//     grab = true;
//   }

//   const moveEventActions = (e) => {
//     e.preventDefault();
//     if (grab) {
//       const currentMousePos = getClientPositions(e);

//       trigger.style.left = (currentMousePos.posX - startOffsets.left) + 'px';
//       trigger.style.top = (currentMousePos.posY - startOffsets.top) + 'px';

//       popoverAutoPosition.observe();
//     }
//   }

//   const completeEventAction = (e) => {
//     grab = false;
//   }

//   trigger.addEventListener('mousedown', startEventActions);
//   document.addEventListener('mousemove', moveEventActions);
//   document.addEventListener('mouseup', completeEventAction);
// }
</script>

<template>
  <transition name="popover-fade">
    <div v-show="isOpen" class="popover" ref="popoverBody" :style="{ top: `${popoverOffsets.top}px`, left: `${popoverOffsets.left}px` }">
      <span class="triangle" ref="triangle" />
      <slot>Content here</slot>
    </div>
  </transition>
</template>

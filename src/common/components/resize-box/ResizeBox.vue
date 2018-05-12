<script>
import { clamp } from '../../utils/math-helper';
import { noop } from '../../utils/base-helper';
import './resize-box.scss';

export default {
  name: 'ResizeBox',
  props: {
    tag: { type: String, default: 'div' },
    onEndOfResize: { type: Function, default: noop },
    disabled: { type: Boolean, default: false },
    resize: { type: String, required: true },
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    size: { type: Number, default: 35 }
  },
  data() {
    return {
      currentSize: this.size,
      rootNode: null,
      grabState: {
        column: false,
        row: false
      }
    }
  },
  methods: {
    startResize(e) {
      e.preventDefault();
      this.grabState[this.resize] = true;
    },
    processResize(e) {
      if (this.grabState.row) {
        e.preventDefault();
        const currentY = this.rootNode.parentNode.clientHeight - e.pageY;
        const heightPercentages = (currentY * this.max) / this.rootNode.parentNode.clientHeight;
        this.currentSize = clamp(heightPercentages, this.min, this.max);
      }

      if (this.grabState.column) {
        e.preventDefault();
        const currentX = this.rootNode.parentNode.clientWidth - e.pageX;
        const widthPercentages = this.max - ((currentX * this.max) / this.rootNode.parentNode.clientWidth);
        this.currentSize = clamp(widthPercentages, this.min, this.max);
      }
    },
    completeResize() {
      this.grabState[this.resize] = false;
      this.onEndOfResize(this.currentSize);
    }
  },
  mounted() {
    this.rootNode = this.$refs.rootNode;

    document.addEventListener('mousemove', this.processResize);
    document.addEventListener('mouseup', this.completeResize);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.processResize);
    document.removeEventListener('mouseup', this.completeResize);
  },
  render(createElement) {
    return createElement(
      this.tag,
      { class: `resize-box ${this.resize}`, ref: 'rootNode', style: { 'flex-basis': this.disabled ? 'auto' : `${this.currentSize}%` } },
      [
        this.disabled ? null : createElement('div', { on: { mousedown: this.startResize }, class: 'grab-resize' }),
        this.$slots.default
      ]
    )
  }
}
</script>

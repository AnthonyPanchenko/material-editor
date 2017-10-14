<script>
import clamp from '../../common/utils/clamp';
import noop from '../../common/utils/noop';

export default {
  name: 'ResizeBox',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    onEndOfResize: {
      type: Function,
      default: noop,
    },
    customClass: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 35,
    }
  },
  data() {
    return {
      currentSize: this.size,
      rootNode: null,
      grabState: {
        column: false,
        row: false,
      },
    }
  },
  methods: {
    startResize(e) {
      e.preventDefault();
      this.grabState[this.resize] = true;
    },
    processResize(e) {
      e.preventDefault();

      if (this.grabState.row) {
        const currentY = this.rootNode.parentNode.clientHeight - e.pageY;
        const heightPercentages = (currentY * 100) / this.rootNode.parentNode.clientHeight;
        this.currentSize = clamp(heightPercentages, 0, 100);
      }

      if (this.grabState.column) {
        const currentX = this.rootNode.parentNode.clientWidth - e.pageX;
        const widthPercentages = 100 - ((currentX * 100) / this.rootNode.parentNode.clientWidth);
        this.currentSize = clamp(widthPercentages, 0, 100);
      }
    },
    completeResize() {
      this.grabState[this.resize] = false;
      this.onEndOfResize(this.currentSize);
    },
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
      { class: `${this.customClass} resize-box`, ref: 'rootNode', style: { 'flex-basis': this.disabled ? 'auto' : `${this.currentSize}%` } },
      [
        this.disabled ? null : createElement('div', { on: { mousedown: this.startResize }, class: `grab-resize-${this.resize}` }),
        this.$slots.default,
      ]
    )
  },
}
</script>

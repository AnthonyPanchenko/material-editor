<script>
import { noop, emptyObject, getElementOffsets } from '../../utils/base-helper';
import { clamp } from '../../utils/math-helper';

export default {
  name: 'MouseMove',
  props: {
    tag: { type: String, default: 'div' },
    onInit: { type: Function, default: noop },
    styleCss: { type: Object, default: emptyObject },
    onMove: { type: Function, default: noop }
  },
  data() {
    return {
      offsets: null,
      isMouseDown: false
    };
  },
  methods: {
    onMouseDownAction(event) {
      event.preventDefault();
      this.isMouseDown = true;
      this.offsets = getElementOffsets(this.$refs.currentNode);

      this.defineXY(event);
    },
    onMouseMoveAction(event) {
      if (this.isMouseDown) {
        event.preventDefault();
        this.defineXY(event);
      }
    },
    onMouseUpAction() {
      this.isMouseDown = false;
    },
    defineXY(event) {
      const x = clamp(event.pageX - this.offsets.left, 0, this.$refs.currentNode.clientWidth);
      const y = clamp(event.pageY - this.offsets.top, 0, this.$refs.currentNode.clientHeight);

      this.onMove(x, y, this.$refs.currentNode);
    }
  },
  mounted() {
    this.onInit(this.$refs.currentNode);

    document.addEventListener('mousemove', this.onMouseMoveAction);
    document.addEventListener('mouseup', this.onMouseUpAction);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMoveAction);
    document.removeEventListener('mouseup', this.onMouseUpAction);
  },
  render(createElement) {
    return createElement(this.tag, { style: this.styleCss, ref: 'currentNode', on: { mousedown: this.onMouseDownAction } }, this.$slots.default);
  }
};
</script>

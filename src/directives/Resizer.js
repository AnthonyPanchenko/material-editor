import clamp from '../common/utils/clamp';

export default {
  inserted(grab, binding, vnode) {
    if (!binding.value) {
      return;
    }

    const parent = vnode.elm.parentNode;

    const grabState = {
      column: false,
      row: false,
    };

    const startResize = (e) => {
      e.preventDefault();
      grabState[binding.value] = true;
    };

    const processResize = (e) => {
      e.preventDefault();

      if (grabState.row) {
        const currentY = parent.parentNode.clientHeight - e.pageY;
        const heightPercentages = 100 - ((currentY * 100) / parent.parentNode.clientHeight);
        parent.style.flexBasis = `${clamp(heightPercentages, 0, 100)}%`;
      }

      if (grabState.column) {
        const currentX = parent.parentNode.clientWidth - e.pageX;
        const widthPercentages = 100 - ((currentX * 100) / parent.parentNode.clientWidth);
        parent.style.flexBasis = `${clamp(widthPercentages, 0, 100)}%`;
      }
    };

    const completeResize = () => {
      grabState[binding.value] = false;
    };

    grab.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', processResize);
    document.addEventListener('mouseup', completeResize);
  },
};

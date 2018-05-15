export const noop = () => undefined;

export const emptyObject = () => ({});

export const emptyArray = () => [];

export const debounce = function (ms, fn) {
  let timer;

  return function () {
    clearTimeout(timer);
    const args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    timer = setTimeout(fn.bind.apply(fn, args), ms);
  };
};

export const createSelectOptions = (obj) =>
  Object.keys(obj).map(key => ({ title: obj[key], id: obj[key] }));

export const getTouchClickPosition = (event) => ({
  posX: event.touches ? event.touches[0].pageX : event.pageX,
  posY: event.touches ? event.touches[0].pageY : event.pageY
});

export const getElementOffsets = (element) => {
  const clientRect = element.getBoundingClientRect();
  const docElelement = document.documentElement;

  return {
    top: (clientRect.top + window.pageYOffset) - docElelement.clientTop,
    left: (clientRect.left + window.pageXOffset) - docElelement.clientLeft
  };
};

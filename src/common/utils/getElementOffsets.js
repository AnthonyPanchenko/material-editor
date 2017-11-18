const getElementOffsets = (element) => {
  const clientRect = element.getBoundingClientRect();
  const docElelement = document.documentElement;

  return {
    top: (clientRect.top + window.pageYOffset) - docElelement.clientTop,
    left: (clientRect.left + window.pageXOffset) - docElelement.clientLeft
  };
};

export default getElementOffsets;

const touchClickPositions = {
  posX: 0,
  posY: 0
};

const getOnTouchClickPosition = (event) => {
  touchClickPositions.posX = event.touches ? event.touches[0].pageX : event.pageX;
  touchClickPositions.posY = event.touches ? event.touches[0].pageY : event.pageY;

  return touchClickPositions;
};

export default getOnTouchClickPosition;

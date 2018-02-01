const getTouchClickPosition = (event) => ({
  posX: event.touches ? event.touches[0].pageX : event.pageX,
  posY: event.touches ? event.touches[0].pageY : event.pageY
});

export default getTouchClickPosition;

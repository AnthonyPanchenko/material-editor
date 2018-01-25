const specialCharPlaceholder = () => {
  const tag = document.createElement('span');
  tag.appendChild(document.createTextNode(''));

  return tag;
};

export default specialCharPlaceholder;

const withoutProps = (inpObj, props) => {
  const temp = { ...inpObj };

  const removeProps = (obj, prop) => {
    for (const p in obj) {
      if (p === prop) {
        delete obj[p];
      } else if (obj[p] && (typeof obj[p] === 'object') && !Array.isArray(obj[p])) {
        removeProps(obj[p], prop);
      }
    }
  };

  for (let i = 0; i < props.length; i++) {
    removeProps(temp, props[i]);
  }

  return temp;
};

module.exports = withoutProps;

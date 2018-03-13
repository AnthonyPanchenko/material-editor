exports.valueValidator = (val) => {
  if (val && ((typeof val === 'string') || Array.isArray(val) || !isNaN(val))) {
    return true;
  }

  return false;
};

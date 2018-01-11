export const normalizeVector = (vec) => {
  const sLength = vectorLength(vec) || 1;

  return vec.map(cord => cord / sLength);
};

export const vectorLength = (vec) => {
  let scalar = 0;

  for (let i = 0; i < vec.length; i++) {
    scalar += vec[i] ** 2;
  }

  return Math.sqrt(scalar);
};

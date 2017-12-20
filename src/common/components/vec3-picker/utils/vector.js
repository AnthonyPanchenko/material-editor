export const vectorAction = (vec, actionCallback) => {
  const newVector = [];
  for (let i = 0; i < vec.length; i++) {
    newVector[i] = actionCallback(vec[i], i);
  }

  return newVector;
};

export const normalizeVector = (vec) => {
  const sLength = getVectorLength(vec);

  return vectorAction(vec, (cord) => cord / sLength);
};

export const getVectorLength = (vec) => {
  let scalar = 0;

  for (let i = 0; i < vec.length; i++) {
    scalar += Math.pow(vec[i], 2);
  }

  return Math.sqrt(scalar);
};

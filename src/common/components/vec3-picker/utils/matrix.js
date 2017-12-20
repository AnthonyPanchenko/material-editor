export const getDeterminant = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

export const getInverseMatrix = (m) => {
  const invdet = 1 / getDeterminant(m);

  return [
    [(m[1][1] * m[2][2] - m[2][1] * m[1][2]) * invdet, -(m[0][1] * m[2][2] - m[0][2] * m[2][1]) * invdet, (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invdet],
    [-(m[1][0] * m[2][2] - m[1][2] * m[2][0]) * invdet, (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invdet, -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) * invdet],
    [(m[1][0] * m[2][1] - m[2][0] * m[1][1]) * invdet, -(m[0][0] * m[2][1] - m[2][0] * m[0][1]) * invdet, (m[0][0] * m[1][1] - m[1][0] * m[0][1]) * invdet]
  ];
};

export const rotationX = (theta) => {
  const c = Math.cos(theta);
  const s = Math.sin(theta);

  return [
    [1, 0, 0],
    [0, c, -s],
    [0, s, c]
  ];
};

export const rotationY = (theta) => {
  const c = Math.cos(theta);
  const s = Math.sin(theta);

  return [
    [c, 0, s],
    [0, 1, 0],
    [-s, 0, c]
  ];
};

export const multiplyMatrix = (matrixA, matrixB) => {
  const result = [];

  for (let i = 0; i < matrixA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrixA.length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < matrixB.length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return result;
};

export const multiplyVector = (matrix, vector) => {
  let sum = 0;
  const result = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j] * vector[j];
    }

    result[i] = sum;
    sum = 0;
  }

  return result;
};

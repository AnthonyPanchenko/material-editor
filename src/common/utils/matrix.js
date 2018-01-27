export const determinantOfMatrix = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

export const getInverseMatrix = (m) => {
  const invdet = 1 / determinantOfMatrix(m);

  return [
    [(m[1][1] * m[2][2] - m[2][1] * m[1][2]) * invdet, -(m[0][1] * m[2][2] - m[0][2] * m[2][1]) * invdet, (m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invdet],
    [-(m[1][0] * m[2][2] - m[1][2] * m[2][0]) * invdet, (m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invdet, -(m[0][0] * m[1][2] - m[1][0] * m[0][2]) * invdet],
    [(m[1][0] * m[2][1] - m[2][0] * m[1][1]) * invdet, -(m[0][0] * m[2][1] - m[2][0] * m[0][1]) * invdet, (m[0][0] * m[1][1] - m[1][0] * m[0][1]) * invdet]
  ];
};

export const getViewMatrix = (theta, phi) => {
  const cx = Math.cos(theta);
  const sx = Math.sin(theta);
  const cy = Math.cos(phi);
  const sy = Math.sin(phi);

  return [
    [cy, 0, sy],
    [-sx * (-sy), cx, -sx * cy],
    [-sy * cx, sx, cx * cy]
  ];
};

export const multiplyMatrixByVector = (matrix, vector) => {
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

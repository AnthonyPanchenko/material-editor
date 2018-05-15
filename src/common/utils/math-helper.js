export const clamp = (num, min, max) =>
  Math.min(Math.max(num, min), max);

export const roundNum = (x, n = 3) => {
  if (isNaN(x)) {
    return 0;
  };

  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
};

export const determinantOfMatrix = (m) =>
  m[0] * (m[4] * m[8] - m[7] * m[5]) - m[1] * (m[3] * m[8] - m[5] * m[6]) + m[2] * (m[3] * m[7] - m[4] * m[6]);

export const getInverseMatrix = (m) => {
  const invdet = 1 / determinantOfMatrix(m);

  return [
    (m[4] * m[8] - m[7] * m[5]) * invdet, -(m[1] * m[8] - m[2] * m[7]) * invdet, (m[1] * m[5] - m[2] * m[4]) * invdet,
    -(m[3] * m[8] - m[5] * m[6]) * invdet, (m[0] * m[8] - m[2] * m[6]) * invdet, -(m[0] * m[5] - m[3] * m[2]) * invdet,
    (m[3] * m[7] - m[6] * m[4]) * invdet, -(m[0] * m[7] - m[6] * m[1]) * invdet, (m[0] * m[4] - m[3] * m[1]) * invdet
  ];
};

export const getViewMatrix = (theta, phi) => {
  const cx = Math.cos(theta);
  const sx = Math.sin(theta);
  const cy = Math.cos(phi);
  const sy = Math.sin(phi);

  return [cy, 0, sy, -sx * (-sy), cx, -sx * cy, -sy * cx, sx, cx * cy];
};

export const multiplyMatrixByVector = (matrix, vector) => {
  let k = 0;
  let j = 0;
  let sum = 0;
  const result = [];

  for (let i = 0; i < matrix.length; i++) {
    if ((i + 1) % 3 === 0) {
      sum += matrix[i] * vector[2];
      result[j] = sum;
      sum = 0;
      k = 0;
      j++;
    } else {
      sum += matrix[i] * vector[k];
      k++;
    }
  }

  return result;
};

export const matrices = {
  mat2: [1, 0, 0, 1],
  mat3: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  mat4: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
};

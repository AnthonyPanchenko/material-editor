export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const roundNum = (x, n = 2) => {
  if (isNaN(x)) {
    return 0;
  };

  const m = Math.pow(10, n);
  return Math.round(x * m) / m;
};

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

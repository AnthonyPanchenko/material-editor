import { clamp } from './math-helper';

// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
const xyzMatrix = {
  x: [0.4124564, 0.3575761, 0.1804375],
  y: [0.2126729, 0.7151522, 0.0721750],
  z: [0.0193339, 0.1191920, 0.9503041]
};

const rgbMatrix = {
  r: [3.2404542, -1.5371385, -0.4985314],
  g: [-0.9692660, 1.8760108, 0.0415560],
  b: [0.0556434, -0.2040259, 1.0572252]
};

export const xyzToRgb = (x, y, z) => {
  const n = 0.416666667;
  const m = 0.0031308;

  const r = x * rgbMatrix.r[0] + y * rgbMatrix.r[1] + z * rgbMatrix.r[2];
  const g = x * rgbMatrix.g[0] + y * rgbMatrix.g[1] + z * rgbMatrix.g[2];
  const b = x * rgbMatrix.b[0] + y * rgbMatrix.b[1] + z * rgbMatrix.b[2];

  return {
    r: clamp((r > m ? 1.055 * Math.pow(r, n) - 0.055 : 12.92 * r), 0, 1),
    g: clamp((g > m ? 1.055 * Math.pow(g, n) - 0.055 : 12.92 * g), 0, 1),
    b: clamp((b > m ? 1.055 * Math.pow(b, n) - 0.055 : 12.92 * b), 0, 1)
  };
}

export const rgbToXyz = (r, g, b) => {
  const n = 0.04045;
  const red = (r > n ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92);
  const green = (g > n ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92);
  const blue = (b > n ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92);

  return {
    x: red * xyzMatrix.x[0] + green * xyzMatrix.x[1] + blue * xyzMatrix.x[2],
    y: red * xyzMatrix.y[0] + green * xyzMatrix.y[1] + blue * xyzMatrix.y[2],
    z: red * xyzMatrix.z[0] + green * xyzMatrix.z[1] + blue * xyzMatrix.z[2]
  };
};

export const hueToRgb = (hue) => {
  const h = hue / 60;
  const mod = Math.floor(h);
  const i = (h === 6) ? 0 : (h - mod);

  return [
    Math.round([1, 1 - i, 0, 0, i, 1][mod] * 255),
    Math.round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
    Math.round([0, 0, i, 1, 1, 1 - i][mod] * 255)
  ];
};

export const rgbToHsv = (r, g, b, a) => {
  let hue;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) {
    hue = 0;
  } else if (r === max) {
    hue = ((g - b) / delta) % 6;
  } else if (g === max) {
    hue = (b - r) / delta + 2;
  } else if (b === max) {
    hue = (r - g) / delta + 4;
  }

  hue = Math.round(hue * 60);

  if (hue < 0) {
    hue += 360;
  }

  return [
    hue,
    Math.round((max === 0 ? 0 : (delta / max)) * 100),
    Math.round(max / 255 * 100),
    a
  ];
};

export const hsvToRgb = (h, s, v, a) => {
  const ns = s / 100;
  const nv = v / 100;
  const c = nv * ns;
  const nh = h / 60;
  const x = c * (1 - Math.abs(nh % 2 - 1));
  const m = nv - c;
  const p = parseInt(nh, 10);

  let rgb = [];

  switch (p) {
    case 0: rgb = [c, x, 0]; break;
    case 1: rgb = [x, c, 0]; break;
    case 2: rgb = [0, c, x]; break;
    case 3: rgb = [0, x, c]; break;
    case 4: rgb = [x, 0, c]; break;
    case 5: rgb = [c, 0, x]; break;
    default: rgb;
  }

  return [
    Math.round(255 * (rgb[0] + m)),
    Math.round(255 * (rgb[1] + m)),
    Math.round(255 * (rgb[2] + m)),
    a
  ];
};

export const rgbToHex = (r, g, b, a) => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  if (a < 1 && a !== 1) {
    const val = Math.round(a * 255).toString(16);

    return (val.length === 1) ? hex + '0' + val : hex + val;
  }

  return hex;
};

export const hexToRgb = (hex) => {
  let val = hex;
  if (hex.length === 3) {
    val = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const color = [
    parseInt(val[0] + val[1], 16),
    parseInt(val[2] + val[3], 16),
    parseInt(val[4] + val[5], 16),
    1
  ];

  if (hex.length === 8) {
    color[3] = +(parseInt(val[6] + val[7], 16) / 255).toFixed(2);
  }

  return color;
};

export const isHex = (hex) =>
  /(\b[a-fA-F0-9]{3}\b|\b[a-fA-F0-9]{6}\b|\b[a-fA-F0-9]{8}\b)/.test(hex);

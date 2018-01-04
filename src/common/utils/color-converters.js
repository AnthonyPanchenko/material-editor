import clamp from './clamp';

// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
const XYZMatrix = {
  X: [0.4124564, 0.3575761, 0.1804375],
  Y: [0.2126729, 0.7151522, 0.0721750],
  Z: [0.0193339, 0.1191920, 0.9503041]
};

const RGBMatrix = {
  R: [3.2404542, -1.5371385, -0.4985314],
  G: [-0.9692660, 1.8760108, 0.0415560],
  B: [0.0556434, -0.2040259, 1.0572252]
};

export const XYZtoRGB = (x, y, z) => {
  const N = 1 / 2.4;
  const M = 0.0031308;

  const r = x * RGBMatrix.R[0] + y * RGBMatrix.R[1] + z * RGBMatrix.R[2];
  const g = x * RGBMatrix.G[0] + y * RGBMatrix.G[1] + z * RGBMatrix.G[2];
  const b = x * RGBMatrix.B[0] + y * RGBMatrix.B[1] + z * RGBMatrix.B[2];

  return {
    r: clamp((r > M ? 1.055 * Math.pow(r, N) - 0.055 : 12.92 * r), 0, 1),
    g: clamp((g > M ? 1.055 * Math.pow(g, N) - 0.055 : 12.92 * g), 0, 1),
    b: clamp((b > M ? 1.055 * Math.pow(b, N) - 0.055 : 12.92 * b), 0, 1)
  };
}

export const RGBtoXYZ = (r, g, b) => {
  const N = 0.04045;
  const red = (r > N ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92);
  const green = (g > N ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92);
  const blue = (b > N ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92);

  return {
    x: red * XYZMatrix.X[0] + green * XYZMatrix.X[1] + blue * XYZMatrix.X[2],
    y: red * XYZMatrix.Y[0] + green * XYZMatrix.Y[1] + blue * XYZMatrix.Y[2],
    z: red * XYZMatrix.Z[0] + green * XYZMatrix.Z[1] + blue * XYZMatrix.Z[2]
  };
};

export const RGBtoHSV = (r, g, b) => {
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

  hue = Math.round(h * 60);

  if (hue < 0) {
    hue += 360;
  }

  return {
    h: hue,
    s: Math.round((max === 0 ? 0 : (delta / max)) * 100),
    v: Math.round(max / 255 * 100)
  };
};

export const HSVtoRGB = (h, s, v) => {
  const ns = s / 100;
  const nv = v / 100;
  const c = nv * ns;
  const nh = h / 60;
  const x = c * (1 - Math.abs(nh % 2 - 1));
  const m = nv - c;
  const p = parseInt(nh, 10);
  const rgb = (p === 0 ? [c, x, 0] : p === 1 ? [x, c, 0] : p === 2 ? [0, c, x] : p === 3 ? [0, x, c] : p === 4 ? [x, 0, c] : p === 5 ? [c, 0, x] : []);

  return {
    r: Math.round(255 * (rgb[0] + m)),
    g: Math.round(255 * (rgb[1] + m)),
    b: Math.round(255 * (rgb[2] + m))
  };
};

const pad2 = (val) => {
  return (val < 16 ? '0' : '') + val.toString(16);
};

export const RGBAtoHEX = (r, g, b, a) => {
  const red = pad2(Math.round(r).toString(16));
  const green = pad2(Math.round(g).toString(16));
  const blue = pad2(Math.round(b).toString(16));

  const rgb = red + green + blue;

  return (a < 1 && a !== 1) ? rgb + pad2(Math.round(parseFloat(a) * 255).toString(16)) : rgb;
};

export const HEXtoRGBA = (hexa) => {
  let hex = hexa;

  if (hexa.length === 3) {
    hex = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
  }

  const color = {
    r: parseInt(hex[0] + hex[1], 16),
    g: parseInt(hex[2] + hex[3], 16),
    b: parseInt(hex[4] + hex[5], 16)
  };

  if (hexa.length === 8) {
    color['a'] = parseInt(hex[6] + hex[7], 16);
  }

  return color;
};

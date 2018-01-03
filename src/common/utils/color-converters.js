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

const HUEtoRGB = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;

  return p;
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

// https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
export const HSLtoRGB = (h, s, l) => {
  let r = 0;
  let g = 0;
  let b = 0;

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = HUEtoRGB(p, q, h + 1 / 3);
    g = HUEtoRGB(p, q, h);
    b = HUEtoRGB(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};

export const RGBtoHSL = (r, g, b) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const val = (max + min) / 2;

  let h = val;
  let s = val;
  const l = val;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case red: h = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green: h = (blue - red) / d + 2;
        break;
      case blue: h = (red - green) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};

export const RGBtoHSV = (r, g, b) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let h = max;
  let s = max;
  const v = max;

  const d = max - min;
  s = (max === 0) ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
      case green: h = (blue - red) / d + 2; break;
      case blue: h = (red - green) / d + 4; break;
    }

    h /= 6;
  }

  return [h, s, v];
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

  return [
    Math.round(255 * (rgb[0] + m)),
    Math.round(255 * (rgb[1] + m)),
    Math.round(255 * (rgb[2] + m))
  ];
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
    r: parseInt(hex[0] + hex[1], 16) / 255,
    g: parseInt(hex[2] + hex[3], 16) / 255,
    b: parseInt(hex[4] + hex[5], 16) / 255
  };

  if (hexa.length === 8) {
    color['a'] = parseInt(hex[6] + hex[7], 16) / 255;
  }

  return color;
};

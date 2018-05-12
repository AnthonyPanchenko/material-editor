// https://www.easyrgb.com/en/math.php
// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// sRGB D65

export const xyzToRgb = (x, y, z) => {
  const dx = x / 100;
  const dy = y / 100;
  const dz = z / 100;

  const red = (dx * 3.2404542) + (dy * -1.5371385) + (dz * -0.4985314);
  const green = (dx * -0.9692660) + (dy * 1.8760108) + (dz * 0.0415560);
  const blue = (dx * 0.0556434) + (dy * -0.2040259) + (dz * 1.0572252);

  return {
    r: Math.round(((red > 0.0031308) ? 1.055 * (red ** (1 / 2.4)) - 0.055 : 12.92 * red) * 255),
    g: Math.round(((green > 0.0031308) ? 1.055 * (green ** (1 / 2.4)) - 0.055 : 12.92 * green) * 255),
    b: Math.round(((blue > 0.0031308) ? 1.055 * (blue ** (1 / 2.4)) - 0.055 : 12.92 * blue) * 255)
  };
};

export const rgbToXyz = (r, g, b) => {
  const dr = r / 255;
  const dg = g / 255;
  const db = b / 255;

  const red = ((dr > 0.04045) ? ((dr + 0.055) / 1.055) ** 2.4 : dr / 12.92) * 100;
  const green = ((dg > 0.04045) ? ((dg + 0.055) / 1.055) ** 2.4 : dg / 12.92) * 100;
  const blue = ((db > 0.04045) ? ((db + 0.055) / 1.055) ** 2.4 : db / 12.92) * 100;

  return {
    x: (red * 0.4124564) + (green * 0.3575761) + (blue * 0.1804375),
    y: (red * 0.2126729) + (green * 0.7151522) + (blue * 0.0721750),
    z: (red * 0.0193339) + (green * 0.1191920) + (blue * 0.9503041)
  };
};

export const rgbToVector = (rgb) => {
  return rgb.map(c => +(c / 255).toFixed(3));
};

export const vectorToRgb = (vec) => {
  return vec.map(v => Math.round(Math.abs(v) * 255));
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

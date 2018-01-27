export const hueToRgb = (hue) => {
  const h = hue / 60;
  const mod = Math.floor(h);
  const i = (h === 6) ? 0 : (h - mod);

  return {
    r: Math.round([1, 1 - i, 0, 0, i, 1][mod] * 255),
    g: Math.round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
    b: Math.round([0, 0, i, 1, 1, 1 - i][mod] * 255)
  };
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

  return {
    a,
    h: hue,
    s: Math.round((max === 0 ? 0 : (delta / max)) * 100),
    v: Math.round(max / 255 * 100)
  };
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

  return {
    a,
    r: Math.round(255 * (rgb[0] + m)),
    g: Math.round(255 * (rgb[1] + m)),
    b: Math.round(255 * (rgb[2] + m))
  };
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

  const color = {
    a: 1,
    r: parseInt(val[0] + val[1], 16),
    g: parseInt(val[2] + val[3], 16),
    b: parseInt(val[4] + val[5], 16)
  };

  if (hex.length === 8) {
    color.a = +(parseInt(val[6] + val[7], 16) / 255).toFixed(2);
  }

  return color;
};

export const isHex = (hex) =>
  /(\b[a-fA-F0-9]{3}\b|\b[a-fA-F0-9]{6}\b|\b[a-fA-F0-9]{8}\b)/.test(hex);

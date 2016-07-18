

function randomFromRange(min, max) {
  let variability = max - min + 1;
  let valueToAdd = Math.floor(Math.random() * variability);
  return min + valueToAdd;
}

// ----------------------------

let colorHelper = {};

colorHelper.hsv_to_rgb = function (h, s, v) { // borrowed from colorsys
  const RGB_MAX = 255;
  const HUE_MAX = 360;
  const SV_MAX = 100;
  if (typeof h === 'object') {
    const args = h;
    h = args.h; s = args.s; v = args.v;
  }

  h = h === HUE_MAX ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6);
  s = s === SV_MAX ? 1 : (s % SV_MAX / parseFloat(SV_MAX));
  v = v === SV_MAX ? 1 : (v % SV_MAX / parseFloat(SV_MAX));

  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];

  return { r: Math.round(r * RGB_MAX), g: Math.round(g * RGB_MAX), b: Math.round(b * RGB_MAX) };
};


colorHelper.pastel = {

  random: () => {
    let hsv = {h: randomFromRange(0, 360), s: 43, v: 84};
    return colorHelper.hsv_to_rgb(hsv);
  }

};



export default colorHelper;

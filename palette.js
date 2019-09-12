"use strict";
// declare variables
const root = document.documentElement;
const harmony = document.querySelector("#harmony");
const colorInput = document.querySelector("#picker");

const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const hsl = document.querySelector("#hsl");

const hsl1 = document.querySelector("#hsl1");
const hex1 = document.querySelector("#hex1");
const rgb1 = document.querySelector("#rgb1");

const picked_color1 = document.querySelector(".picked_color1");
const picked_color2 = document.querySelector(".picked_color2");
const picked_color3 = document.querySelector(".picked_color3");
const picked_color4 = document.querySelector(".picked_color4");

// change hex to rgb
// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToRGB(h) {
  h = h.replace("#", "");
  let r = parseInt(h.substring(0, 2), 16);
  let g = parseInt(h.substring(2, 4), 16);
  let b = parseInt(h.substring(4, 6), 16);

  let result = "(" + r + "," + g + "," + b + ")";
  return result;
}

// change rgb to hsl
// Fronter code

function rgbToHSL(a) {
  a = a.slice(1, -1);

  let r = a.split(",")[0];
  let g = a.split(",")[1];
  let b = a.split(",")[2];

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // round hsl
  function roundNumbers() {
    h = h.toFixed(0);
    s = s.toFixed(0);
    l = l.toFixed(0);
  }
  roundNumbers();

  // return template literals of h s l
  let result = `${h}° ${s}% ${l}%`;
  return result;
}

// split rgb
function splitRGB(x) {
  x = x.slice(1, -1);
  let r = x.split(",")[0];
  let g = x.split(",")[1];
  let b = x.split(",")[2];
  r = rgbToHex(r);
  g = rgbToHex(g);
  b = rgbToHex(b);

  return `#${r}${g}${b}`;
}

// change rgb to hex
function rgbToHex(x) {
  let hex = Number(x).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

// functions for harmonies

function analogous(rgb) {
  rgb = rgb.slice();
  let h = rgb.split(" ")[0];
  let s = rgb.substring(rgb.indexOf(" ") + 1, rgb.indexOf("%"));
  let l = rgb.substring(rgb.lastIndexOf(" ") + 1, rgb.lastIndexOf("%"));
  h = parseInt(h, 10);

  h = h + 30;
  picked_color1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl1").textContent = `${h} ${s}% ${l}%`;

  h = h - 15;
  picked_color2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;

  h = h - 30;
  picked_color3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;

  h = h - 45;
  picked_color4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function triad(rgb) {
  rgb = rgb.slice();
  let h = rgb.split(" ")[0];
  let s = rgb.substring(rgb.indexOf(" ") + 1, rgb.indexOf("%"));
  let l = rgb.substring(rgb.lastIndexOf(" ") + 1, rgb.lastIndexOf("%"));
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  h = h - 120;
  picked_color1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hsl1.textContent = `${h} ${s}% ${l}%`;
  l = l - 15;
  if (l < 0) {
    l = 0;
  }
  picked_color2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;

  h = h + 240;
  picked_color4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;
  l = l + 30;
  if (l > 100) {
    l = 100;
  }
  picked_color3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function complementary(rgb) {
  rgb = rgb.slice();
  let h = rgb.split(" ")[0];
  let s = rgb.substring(rgb.indexOf(" ") + 1, rgb.indexOf("%"));
  let l = rgb.substring(rgb.lastIndexOf(" ") + 1, rgb.lastIndexOf("%"));
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  l = l - 15;
  if (l < 0) {
    l = 0;
  }
  picked_color1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hsl1.textContent = `${h} ${s}% ${l}%`;
  l = l - 15;
  picked_color2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  l = l + 30;
  if (l > 100) {
    l = 100;
  }
  h = h + 180;
  picked_color3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  l = l + 15;
  if (l > 100) {
    l = 100;
  }
  picked_color4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function compound(rgb) {
  rgb = rgb.slice();
  let h = rgb.split(" ")[0];
  let s = rgb.substring(rgb.indexOf(" ") + 1, rgb.indexOf("%"));
  let l = rgb.substring(rgb.lastIndexOf(" ") + 1, rgb.lastIndexOf("%"));
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  h = h + 20;
  picked_color2.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;

  h = h + 10;
  picked_color1.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl1").textContent = `${h} ${s}% ${l}%`;

  h = h + 150;
  picked_color3.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  l = l + 15;
  if (l > 100) {
    l = 100;
  }
  picked_color4.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

// TO DO: mono and shades!

// function monochromatic(rgb) {
// }

// function shades(rgb) {
// }

function convertValue() {
  root.style.setProperty("--color", colorInput.value);
  //    initial hex
  hex.textContent = colorInput.value;
  //    hex to rgb
  rgb.textContent = hexToRGB(hex.textContent);
  //    rgb to hsl
  hsl.textContent = rgbToHSL(rgb.textContent);

  show_selected();

  rgb1.textContent = picked_color1.style.backgroundColor.substring(3);
  hex1.textContent = splitRGB(rgb1.textContent);

  document.querySelector(
    "#rgb2"
  ).textContent = picked_color2.style.backgroundColor.substring(3);
  document.querySelector(
    "#rgb3"
  ).textContent = picked_color3.style.backgroundColor.substring(3);
  document.querySelector(
    "#rgb4"
  ).textContent = picked_color4.style.backgroundColor.substring(3);
  document.querySelector("#hex2").textContent = splitRGB(
    document.querySelector("#rgb2").textContent
  );
  document.querySelector("#hex3").textContent = splitRGB(
    document.querySelector("#rgb3").textContent
  );
  document.querySelector("#hex4").textContent = splitRGB(
    document.querySelector("#rgb4").textContent
  );
}

// show selected harmony
function show_selected() {
  const value = harmony[harmony.selectedIndex].value;
  if (value == "analogous") {
    analogous(hsl.textContent);
  } else if (value == "monochromatic") {
    // monochromatic(hsl.textContent);
  } else if (value == "triad") {
    triad(hsl.textContent);
  } else if (value == "complementary") {
    complementary(hsl.textContent);
  } else if (value == "compound") {
    compound(hsl.textContent);
  } else if (value == "shades") {
    // shades(hsl.textContent);
  }
}

// event listeners
colorInput.addEventListener("change", convertValue);
harmony.addEventListener("change", show_selected);

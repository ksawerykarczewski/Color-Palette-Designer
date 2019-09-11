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
function hexToRGB(h) {
  h = h.replace("#", "");
  let r = parseInt(h.substring(0, 2), 16);
  let g = parseInt(h.substring(2, 4), 16);
  let b = parseInt(h.substring(4, 6), 16);

  let result = "(" + r + "," + g + "," + b + ")";
  return result;
}

// change rgb to hsl - Fronter code
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
function analogous(x) {
  x = x.slice();
  let h = x.split(" ")[0];
  let s = x.substring(x.indexOf(" ") + 1, x.indexOf("%"));
  let l = x.substring(x.lastIndexOf(" ") + 1, x.lastIndexOf("%"));
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

function convertValue() {
  root.style.setProperty("--color", colorInput.value);
  //    initial hex
  hex.textContent = colorInput.value;
  //    hex to rgb
  rgb.textContent = hexToRGB(hex.textContent);
  //    rgb to hsl
  hsl.textContent = rgbToHSL(rgb.textContent);

  show_selected();
}

function show_selected() {
  const value = harmony[harmony.selectedIndex].value;
  if (value == "choose") {
    console.log("choose");
  } else if (value == "analogous") {
    console.log("analogous");
    analogous(hsl.textContent);
  } else if (value == "monochromatic") {
    console.log("monochromatic");
  } else if (value == "triad") {
    console.log("triad");
  } else if (value == "complementary") {
    console.log("complementary");
  } else if (value == "compound") {
    console.log("compound");
  } else if (value == "shades") {
    console.log("shades");
  }
}

colorInput.addEventListener("change", convertValue);
harmony.addEventListener("change", show_selected);

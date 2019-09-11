// declare variables
const root = document.documentElement;
const colorInput = document.querySelector("#picker");
const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const hsl = document.querySelector("#hsl");

// change hex to rgb
function hexToRGB(h) {
  h = h.replace("#", "");
  r = parseInt(h.substring(0, 2), 16);
  g = parseInt(h.substring(2, 4), 16);
  b = parseInt(h.substring(4, 6), 16);

  result = "(" + r + "," + g + "," + b + ")";
  return result;
}

// change rgb to hsl - Fronter code

function rgbToHSL(a) {
  a = a.slice(1, -1);
  // h = h.slice(1,h.lenght-1);

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

  // Analogous
  // H is shifted a few degrees for each color. S and L are kept constant
  // function for checking h degrees
  if (h <= 90) {
    console.log("h is less then 90");
  } else if (h > 90 && h <= 180) {
    console.log("h is less then 180");
  } else if (h > 180 && h <= 270) {
    console.log("h is less then 270");
  } else if (h > 270 && h <= 360) {
    console.log("h is less then 360");
  }

  // end

  // return template literals of h s l
  let result = `${h}° ${s}% ${l}%`;
  return result;
}

function convertValue() {
  root.style.setProperty("--color", colorInput.value);
  //    initial hex
  hex.textContent = colorInput.value;
  //    hex to rgb
  rgb.textContent = hexToRGB(hex.textContent);
  //    rgb to hsl
  hsl.textContent = rgbToHSL(rgb.textContent);
  //   let HSL = hsl.textContent;
  //   HSL = rgbToHSL(rgb.textContent);
}

colorInput.addEventListener("change", convertValue);

// show selected harmony
const harmony = document.querySelector("#harmony");
function show_selected() {
  const value = harmony[harmony.selectedIndex].value;
  if (value == "analogous") {
    console.log("analogous");
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
harmony.addEventListener("change", show_selected);

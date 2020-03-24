window.addEventListener("DOMContentLoaded", init);
function init() {
  fetchSVG1();
  //fetchSVG2();
}

async function fetchSVG1() {
  fetch("edisons-first-lamp.svg")
    .then(r => r.text())
    .then(text => (document.querySelector("section.lamp").innerHTML = text))
    .then(() => fetch("bubble.svg"))
    .then(r => r.text())
    .then(text => (document.querySelector("section.bubbles").innerHTML = text));
  // let mySVGData = await response.text();
  // document.querySelector("section.lamp").innerHTML = mySVGData;
}
async function fetchSVG2() {
  fetch("bubble.svg")
    .then(r => r.text())
    .then(text => (document.querySelector("section.bubbles").innerHTML = text));
  // let SVGData = await res.text();
  //document.querySelector("section.bubbles").innerHTML = SVGData;
}

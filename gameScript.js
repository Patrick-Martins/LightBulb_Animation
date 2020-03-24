"use strict";
window.addEventListener("DOMContentLoaded", init);
function init() {
  fetchSVG();
  // animateBubbles();
}
let clicked;
async function fetchSVG() {
  fetch("edisons-first-lamp.svg")
    .then(r => r.text())
    .then(text => {
      document.querySelector("section.lamp").innerHTML = text;
    })
    .then(() => fetch("bubble.svg"))
    .then(r => r.text())
    .then(text => {
      document.querySelector("section.bubbles").innerHTML = text;
      animateBubbles();
      editLamp();
    });
}

function animateBubbles() {
  const bubbles = document.querySelectorAll(".bubble");
  console.log(bubbles);

  bubbles.forEach(adding);
}
function adding(bubble) {
  bubble.addEventListener("click", () => {
    clearAll();
    bubble.querySelector(".st1").style.fill = "lightblue";
    clicked = bubble.id;
    console.log(clicked);
  });
}
function clearAll() {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach(bubble => {
    bubble.querySelector(".st1").style.fill = "white";
  });
}
function editLamp() {
  document.querySelector(".Lampst6").setAttribute("display", "none");
  document.querySelector("#filament").setAttribute("display", "none");

  document.querySelector("#glass").addEventListener("click", chechMaterial);
}
function chechMaterial() {
  if (clicked == "bamboo") {
    console.log("That's right!");

    document.querySelector(".Lampst6").setAttribute("display", "static");
    document.querySelector("#filament").setAttribute("display", "static");
    document.querySelector("#filament").style.stroke = "orange";
  } else {
    console.log("Wrong!");
  }
}

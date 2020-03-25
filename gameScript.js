"use strict";

import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { Power1 } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);
function init() {
  fetchSVG();
  // animateBubbles();
}
let clicked;
async function fetchSVG() {
  let response = await fetch("edisons-first-lamp.svg");
  let mySVGData = await response.text();
  document.querySelector("section.lamp").innerHTML = mySVGData;

  response = await fetch("bubble.svg");
  mySVGData = await response.text();
  document.querySelector("section.bubbles").innerHTML = mySVGData;
  animateBubbles();
  editLamp();
}

function animateBubbles() {
  const bubbles = document.querySelectorAll(".bubble");

  bubbles.forEach(animate);
}

function random() {
  const num = Math.random() * 0.5;
  console.log(num);

  return num;
}
let delayed = 0;
function animate(bubble) {
  console.log(delayed + " " + bubble.id);
  TweenMax.from(bubble, 1.8, { y: -20, repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: random() });

  delayed += 0.2;

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
  document.querySelector("#glass").addEventListener("click", checkMaterial);
}
function checkMaterial() {
  if (clicked == "bamboo") {
    console.log("That's right!");

    document.querySelector(".Lampst6").setAttribute("display", "static");
    document.querySelector("#filament").setAttribute("display", "static");
    document.querySelector("#filament").style.stroke = "orange";
  } else {
    const lamp = document.querySelector("#lamp");
    TweenMax.to(lamp, 0.1, { x: +5, repeat: 3, yoyo: true, ease: Power1.linear });
    TweenMax.to(lamp, 0.1, { x: -5, ease: Power1.linear }, 0.2);

    console.log("Wrong!");
  }
}

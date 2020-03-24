"use strict";
import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  fetchSVG();
  changeViewBox();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  console.log(mySVGData);

  document.querySelector("section.scene1").innerHTML = mySVGData;
  document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
}

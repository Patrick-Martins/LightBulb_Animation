"use strict";
window.addEventListener("DOMContentLoaded", init);

async function init() {
  fetchSVG();
  //changeViewBox();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  console.log(mySVGData);

  document.querySelector("section.scene1").innerHTML = mySVGData;
  document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
}

function turnOnTheLight() {
  document.querySelectorAll(".cls-87, .cls-88").forEach(element => {
    element.addEventListener("click, lightOn");
  });
}

function lightOn(evt) {
  console.log(evt.target);
}

"use strict";
window.addEventListener("DOMContentLoaded", init);

async function init() {
  fetchSVG();
  changeViewBox();
}

async function fetchSVG() {
  let response = await fetch("final_room.svg");
  let mySVGData = await response.text();

  console.log(mySVGData);

  document.querySelector("section.scene1").innerHTML = mySVGData;
}

"use strict";
window.addEventListener("DOMContentLoaded", init);

async function init() {
  fetchSVG();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  document.querySelector("section.scene1").innerHTML = mySVGData;
  document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
  clickBook();
}

function clickBook() {
  const openModal = document.getElementById("open-book");
  const modalBg = document.querySelector(".modal-bg");
  openModal.addEventListener("click", function() {
    modalBg.classList.remove("hidden");
    console.log("openModal");
  });
}

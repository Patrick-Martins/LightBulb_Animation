"use strict";
import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  fetchSVG();
  fetchTimeline();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  document.querySelector("section.scene1").innerHTML = mySVGData;
  document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
  clickBook();
}

async function fetchTimeline() {
  let response = await fetch("timeline.svg");
  let mySVGData = await response.text();

  document.querySelector("section.timeline").innerHTML = mySVGData;
  document.getElementById("timeline");
}

function clickBook() {
  const openModal = document.getElementById("open-book");
  const modalBg = document.querySelector(".modal-bg");
  openModal.addEventListener("click", function() {
    modalBg.classList.remove("hidden");
    console.log("openModal");
  });
}

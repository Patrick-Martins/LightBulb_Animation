"use strict";
import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);
let contentArray = [];
let contentCurrentIndex = 0;

const settings = {
  currentContent: ""
};

function init() {
  fetchSVG();
  fetchTimeline();
  fetchContentJSON();
  addClickNext();
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

  document.querySelector(".timeline").innerHTML += mySVGData;
}

function clickBook() {
  const openBook = document.getElementById("open-book");
  const modalBg = document.querySelector(".modal-bg");
  openBook.addEventListener("click", function() {
    modalBg.classList.remove("hidden");
    console.log("openModal");
    updateStatus();
    updateModal();
  });
}

function fetchContentJSON() {
  fetch("content.json")
    .then(response => response.json())
    .then(saveData);
}

function saveData(content) {
  //saveJSON data in array
  contentArray = content;
}

function updateStatus() {
  //update status in settings object
  settings.currentContent = contentArray[contentCurrentIndex].context;
  console.log(settings.currentContent);
}

function updateModal() {
  if (settings.currentContent == "last-scene") {
    document.querySelector(".modal-bg").classList.add("hidden");
    //animation zooming out
    //https://codepen.io/aarongarciah/pen/kkQGwg animates de viewbox to increase and show
    TweenMax.to("#room", 1.5, { attr: { viewBox: "0 0 600 600" } });
  } else {
    //change content of modal by appending a template with class of settings.currentContent
    const template = document.querySelector(`.${settings.currentContent}`).content;
    const templateCopy = template.cloneNode(true);
    console.log(templateCopy);
    const modal_content = document.querySelector(".content");
    modal_content.innerHTML = "";
    modal_content.appendChild(templateCopy);
  }
}

function addClickNext() {
  const nextBTN = document.querySelector(".next");
  const restartBTN = document.querySelector(".restart");

  nextBTN.addEventListener("click", () => {
    contentCurrentIndex++;
    updateStatus();
    updateModal();
  });
}

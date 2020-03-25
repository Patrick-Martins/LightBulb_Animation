"use strict";
import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { Power1 } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);
let contentArray = [];
let contentCurrentIndex = 0;

const settings = {
  currentContent: ""
};

function init() {
  fetchSVG();
  fetchTimeline();
  // fetchGameSVG();
  fetchContentJSON();
  addClickNext();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  document.querySelector("section.scene1").innerHTML = mySVGData;
  document.getElementById("room").setAttribute("viewBox", "279 120 83 100");
  clickBook();
}

async function fetchTimeline() {
  let response = await fetch("timeline.svg");
  let mySVGData = await response.text();

  document.querySelector(".timeline").innerHTML += mySVGData;
}

async function fetchGameSVG() {
  let response = await fetch("edisons-first-lamp.svg");
  let mySVGData = await response.text();
  document.querySelector("section.lamp").innerHTML = mySVGData;

  response = await fetch("bubble.svg");
  mySVGData = await response.text();
  document.querySelector("section.bubbles").innerHTML = mySVGData;
  animateBubbles();
  editLamp();
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
    TweenMax.to("#room", 2.5, { attr: { viewBox: "100 50 390 390" }, ease: Power1.easeInOut, delay: 1 });
    document.querySelector("#open-book").classList.add("hidden");
    document.querySelector("#pen").classList.add("hidden");
    document.querySelector("#key").classList.add("hidden");
    document.querySelector("#stack-books").classList.add("hidden");
    document.querySelector("#ink").classList.add("hidden");
    document.querySelector("#ruler").classList.add("hidden");
    document.querySelector("#edison-lamp").classList.add("hidden");
    document.querySelector("#laptop").classList.remove("hidden");
    document.querySelector("#iphone").classList.remove("hidden");
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

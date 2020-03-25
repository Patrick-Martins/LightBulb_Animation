import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { TimelineMax } from "gsap/all";
import { Power1 } from "gsap/all";

("use strict");

window.addEventListener("DOMContentLoaded", init);
let contentArray = [];
let contentCurrentIndex = 0;
let clicked;

let timelineArray = [];

const settings = {
  currentContent: ""
};

function init() {
  fetchSVG();
  //changeViewBox();
  fetchTimeline();
  fetchAllImages();
  //   fetchTimeline();
  // fetchGameSVG();
  fetchContentJSON();
  addClickNext();
}

async function fetchSVG() {
  let response = await fetch("final-room.svg");
  let mySVGData = await response.text();

  document.querySelector("section.scene1").innerHTML = mySVGData;
  turnOnTheLight();
  turnOnTheWM();
  turnOnTheTV();
  turnOnTheSpeaker();

  document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
}
/****************** STANDLAMP ANIMATION *******************************************************/

//Makes the lamp clickable
function turnOnTheLight() {
  document.querySelectorAll("#stand-lamp").forEach(element => {
    element.addEventListener("click", lightOn);
    console.log(element);
  });
}
//If the lamp is clicked "turns on the light"
var lampIsOn = false;
//Displays the light
function lightOn() {
  if (lampIsOn) {
    document.getElementById("light-standlamp").style.display = "none";
    lampIsOn = false;
  } else {
    document.getElementById("light-standlamp").style.display = "block";
    lampIsOn = true;
  }
}

/*********************** WASHINGMACHINE ANIMATION **********************************************/

function turnOnTheWM() {
  var element = document.getElementById("washing-machine-glass");
  TweenMax.to(element, 0.1, { x: "+=2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.1, { x: "-=2", yoyo: true, repeat: -1 });
}

/************************* TV ANIMATION *********************************************************/
//GSAP animation for the TV

// function turnOnTheTV() {
//   var element1 = document.getElementById("topbutton-tv");
//   TweenMax.to(element1, 0.5, { rotation: "360", ease: Linear.easeNone, repeat: -1 }, { timeScale: 0 });
//   var element2 = document.getElementById("bottombutton-tv");
//   TweenMax.to(element2, 0.5, { rotation: "360", ease: Linear.easeNone, repeat: -1 }, { timeScale: 0 });
// }

//Makes the TV clickable --> calls the animation

function turnOnTheTV() {
  var tvButtonTop = document.getElementById("topbutton-tv");
  var tvButtonBottom = document.getElementById("bottombutton-tv");
  tvButtonTop.classList.toggle("spin");
  tvButtonBottom.classList.toggle("spin");
}

/************************************** SPEAKER ANIMATION *********************************************************/

function turnOnTheSpeaker() {
  var element = document.getElementById("big-notes");
  TweenMax.to(element, 0.2, { x: "+=1", y: "+2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.2, { x: "-=1", y: "-2", yoyo: true, repeat: -1 });

  var element = document.getElementById("small-notes");
  TweenMax.to(element, 0.2, { x: "+=1", y: "+2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.2, { x: "-=1", y: "-2", yoyo: true, repeat: -1 });

  var element = document.getElementById("sub-sound");
  TweenMax.to(element, 0.1, { x: "+=1", y: "+2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.1, { x: "-=1", y: "-2", yoyo: true, repeat: -1 });

  var element = document.getElementById("big-sound");
  TweenMax.to(element, 0.1, { x: "+=1", y: "+2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.1, { x: "-=1", y: "-2", yoyo: true, repeat: -1 });

  var element = document.getElementById("small-sound");
  TweenMax.to(element, 0.1, { x: "+=1", y: "+2", yoyo: true, repeat: -1 });
  TweenMax.to(element, 0.1, { x: "-=1", y: "-2", yoyo: true, repeat: -1 });
  document.getElementById("room").setAttribute("viewBox", "279 120 83 100");
  clickBook();
}

function fetchAllImages() {
  fetchImage("timeline.svg", ".timeline");
  //   fetchImage("content_images/house_fire.svg", ".lifestyle-impact");
  fetchImage("content_images/house.svg", ".lifestyle-impact");
}

async function fetchTimeline() {
  fetch("timeline.json")
    .then(response => response.json())
    .then(saveTimelineData);
}

function saveTimelineData(TimelineData) {
  timelineArray = TimelineData;
  console.log(timelineArray);
}

async function fetchImage(imageName, elementToAppendTo) {
  let response = await fetch(imageName);
  let mySVGData = await response.text();

  document.querySelector(elementToAppendTo).innerHTML += mySVGData;
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
    TweenLite.to("#room", 2.5, { attr: { viewBox: "100 50 390 390" }, ease: Power1.easeInOut, delay: 1 });
    document.querySelector("#open-book").classList.add("hidden");
    document.querySelector("#pen").classList.add("hidden");
    document.querySelector("#key").classList.add("hidden");
    document.querySelector("#stack-books").classList.add("hidden");
    document.querySelector("#ink").classList.add("hidden");
    document.querySelector("#ruler").classList.add("hidden");
    document.querySelector("#edison-lamp").classList.add("hidden");
    document.querySelector("#laptop").classList.remove("hidden");
    document.querySelector("#iphone").classList.remove("hidden");
  } else if (settings.currentContent == "timeline") {
    //go through array timeline
    timelineArray.forEach(addClickToYear);
  } else {
    if (settings.currentContent == "filament-game") {
      fetchGameSVG();
    }
    //change content of modal by appending a template with class of settings.currentContent
    const template = document.querySelector(`.${settings.currentContent}`).content;
    const templateCopy = template.cloneNode(true);
    console.log(templateCopy);
    const modal_content = document.querySelector(".content");
    modal_content.innerHTML = "";
    modal_content.appendChild(templateCopy);
  }
}

function addClickToYear(yearObject) {
  //select the button for the object
  /////document.getElementById(yearObject.yearID).addEventListener("click", changeTimelineContent(yearObject));
}

function changeTimelineContent(timelineYear) {
  //change text of timeline-text
  //change timeline-image
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
  TweenLite.from(bubble, 1.8, { y: -20, repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: random() });

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
  document.querySelector(".Lampst6").classList.add("hidden");
  document.querySelector("#lamp").addEventListener("click", checkMaterial);
}
function checkMaterial() {
  console.log("hola");

  if (clicked == "bamboo") {
    console.log("That's right!");

    document.querySelector(".Lampst6").classList.remove("hidden");
    document.querySelector("#filament").classList.remove("hidden");

    document.querySelector("#filament").style.stroke = "orange";
  } else {
    const lamp = document.querySelector("#lamp");
    TweenLite.to(lamp, 0.1, { x: +5, repeat: 3, yoyo: true, ease: Power1.linear });
    TweenLite.to(lamp, 0.1, { x: -5, ease: Power1.linear }, 0.2);

    console.log("Wrong!");
  }
}

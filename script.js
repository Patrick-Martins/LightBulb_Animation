"use strict";
import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { TimelineMax } from "gsap/all";

window.addEventListener("DOMContentLoaded", init);
let contentArray = [];
let contentCurrentIndex = 0;

const settings = {
  currentContent: ""
};

function init() {
  fetchSVG();
  //changeViewBox();
  fetchTimeline();
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

  //document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
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
}

// var pulse1 = document.getElementById("big-notes");
// var pulse2 = document.getElementById("small-notes");
// var pulse3 = document.getElementById("big-sound");
// var pulse4 = document.getElementById("small-sound");
// var pulse5 = document.getElementById("sub-note");

// var tl = new TimelineMax({ repeat: 100, repeatDelay: 0.5 });

// tl.fromTo(pulse1, 1, { transformOrigin: "center center", autoAlpha: 1, scale: 1 }, { transformOrigin: "center center", autoAlpha: 0, scale: 1.5, ease: Quad.easeInOut });
// tl.fromTo(pulse2, 1, { transformOrigin: "center center", autoAlpha: 1, scale: 1 }, { transformOrigin: "center center", autoAlpha: 0, scale: 1.5, ease: Quad.easeInOut }, 0.5);

/******************************************************************************************************************/
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

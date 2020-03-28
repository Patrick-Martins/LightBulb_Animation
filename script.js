import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { Power1 } from "gsap/all";
import { Bounce } from "gsap/all";
import { Elastic } from "gsap/all";
import { _createElement } from "gsap/CSSPlugin";

("use strict");

let eventListenerTimeline = false;

window.addEventListener("DOMContentLoaded", init);
let contentArray = [];
let contentCurrentIndex = 0;
let clicked;

let timelineArray = [];

const settings = {
  currentContent: ""
};

async function init() {
  fetchSVG();
  fetchTimelineImage();
  fetchTimelineJSON();
  fetchContentJSON();
  addClickNext();
  addClickPrevious();
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
  TweenMax.to(element, 0.1, {
    x: "+=2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.1, {
    x: "-=2",
    yoyo: true,
    repeat: -1
  });
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
  TweenMax.to(element, 0.2, {
    x: "+=1",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.2, {
    x: "-=1",
    y: "-2",
    yoyo: true,
    repeat: -1
  });

  var element = document.getElementById("small-notes");
  TweenMax.to(element, 0.2, {
    x: "+=1",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.2, {
    x: "-=1",
    y: "-2",
    yoyo: true,
    repeat: -1
  });

  var element = document.getElementById("sub-sound");
  TweenMax.to(element, 0.1, {
    x: "+=1",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.1, {
    x: "-=1",
    y: "-2",
    yoyo: true,
    repeat: -1
  });

  var element = document.getElementById("big-sound");
  TweenMax.to(element, 0.1, {
    x: "+=1",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.1, {
    x: "-=1",
    y: "-2",
    yoyo: true,
    repeat: -1
  });

  var element = document.getElementById("small-sound");
  TweenMax.to(element, 0.1, {
    x: "+=1",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.1, {
    x: "-=1",
    y: "-2",
    yoyo: true,
    repeat: -1
  });
  document.getElementById("room").setAttribute("viewBox", "279 120 83 100");
  clickBook();
}

function fetchTimelineImage() {
  fetchImage("timeline.svg", ".timeline ");
}

async function fetchTimelineJSON() {
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

async function fetchMaterialsSVG() {
  let response = await fetch("materials.svg");
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateMaterials();
}

async function fetchFactory() {
  let response = await fetch("factory-bank.svg");
  let mySVGData = await response.text();
  document.querySelector("section.factory-bank").innerHTML += mySVGData;
  animateFactory();
}

async function fetchHouse() {
  let response = await fetch("house_fire.svg");
  let mySVGData = await response.text();
  document.querySelector("section.house").innerHTML += mySVGData;
  animateFlames();
}

async function fetchPowerPlant() {
  let response = await fetch("power-plant.svg");
  let mySVGData = await response.text();
  document.querySelector("section.power-plant").innerHTML += mySVGData;
  animatePowerPlant();
}

async function fetchBambooSVG() {
  let response = await fetch("theBamboo.svg");
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateBamboo();
}

async function fetchTorchLampsSVG() {
  let response = await fetch("first-page-modal.svg");
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateTorchLamps();
}

async function fetchBooksSVG() {
  let response = await fetch("bigbooks.svg");
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateBooks();
}
async function fetchLamp() {
  let response = await fetch("edisons-first-lamp-process.svg");
  let mySVGData = await response.text();
  document.querySelector("section.process-lamp").innerHTML += mySVGData;
  animateLamp();
}

function animateLamp() {
  const filament = document.querySelector(".filament");
  const glass = document.querySelector(".glass-lit");
  TweenLite.from(
    glass,
    2,
    {
      opacity: 0,
      yoyo: true,
      repeat: -1,
      ease: Power1.easeOut
    },
    0.2
  );
  TweenLite.from(
    filament,
    2,
    {
      stroke: "black",
      yoyo: true,
      repeat: -1,
      ease: Power1.easeOut
    },
    0.2
  );
}

async function fetchSVGToContentBamboo(imagePath) {
  let response = await fetch(imagePath);
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateBamboo();
}

async function fetchSVGToContentTimeline(imagePath) {
  let response = await fetch(imagePath);
  let mySVGData = await response.text();
  document.querySelector(".timeline-image").innerHTML = mySVGData;
}

function animateBamboo() {
  const bamboo = document.querySelector("#theBamboo");
  console.log(bamboo);

  TweenLite.from(
    bamboo,
    2,
    {
      scale: 0,
      opacity: 0,
      ease: Power1.easeOut
    },
    0.2
  );
  TweenLite.from(bamboo, 1.8, {
    y: -10,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
  });
}

function animateMaterials() {
  TweenLite.staggerFrom(
    ".material",
    2,
    {
      scale: 0,
      opacity: 0,
      ease: Bounce.easeOut
    },
    0.2
  );
}

function clickBook() {
  const openBook = document.getElementById("open-book");
  const modalBg = document.querySelector(".modal-bg");
  openBook.addEventListener("click", function(btn) {
    modalBg.classList.remove("hidden");
    console.log("openModal");
    updateStatus(btn.target.className);
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

function updateStatus(btnClass) {
  //   console.log(btn.target);
  if (btnClass === "back" && contentCurrentIndex === -1) {
    //closeModal
    document.querySelector(".modal-bg").classList.add("hidden");
    contentCurrentIndex = 0;
  } else {
    if (btnClass === "back" && settings.currentContent == "timeline") {
      //remove timeline grid if back button is clicked
      const modal_content = document.querySelector(".content");
      modal_content.classList.remove("timeline-grid");
    }
    //update status in settings object
    settings.currentContent = contentArray[contentCurrentIndex].context;
    console.log(settings.currentContent);
  }
}

function updateModal() {
  //if it is in the last scene it should animate the viewbox and show computer and phone
  if (settings.currentContent == "last-scene") {
    document.querySelector(".modal-bg").classList.add("hidden");
    //animation zooming out
    //https://codepen.io/aarongarciah/pen/kkQGwg animates de viewbox to increase and show
    TweenLite.to("#room", 2.5, {
      attr: {
        viewBox: "100 50 390 390"
      },
      ease: Power1.easeInOut,
      delay: 1
    });
    document.querySelector("#open-book").classList.add("hidden");
    document.querySelector("#pen").classList.add("hidden");
    document.querySelector("#key").classList.add("hidden");
    document.querySelector("#stack-books").classList.add("hidden");
    document.querySelector("#ink").classList.add("hidden");
    document.querySelector("#ruler").classList.add("hidden");
    document.querySelector("#edison-lamp").classList.add("hidden");
    document.querySelector("#laptop").classList.remove("hidden");
    document.querySelector("#iphone").classList.remove("hidden");

    //create restart button and add inner html and give class restart
    const newRestartButton = document.createElement("div");
    newRestartButton.innerHTML = "&#8634";
    newRestartButton.classList.add("restart");

    //create text and add inner html and give class restart
    const finalMessage = document.createElement("h2");
    finalMessage.textContent =
      "After homes installed electric outlets, it opened the opportunity for personal use of electric devices. This invention made it possible to enjoy leisure activities in our homes today, such as watching tv, playing video games or chilling with our laptops.";
    finalMessage.classList.add("finalMessage");

    //append button and final message to body
    document.querySelector("body").appendChild(newRestartButton);
    animateRestartBTN();
    document.querySelector("body").appendChild(finalMessage);
    animateFinalMessage();

    newRestartButton.addEventListener("click", () => {
      history.go(0);
    });
  } else {
    //change content of modal by appending a template with class of settings.currentContent
    const template = document.querySelector(`.${settings.currentContent}`).content;
    const templateCopy = template.cloneNode(true);
    console.log(templateCopy);
    const modal_content = document.querySelector(".content");
    modal_content.innerHTML = "";
    modal_content.appendChild(templateCopy);

    //different scenes
    if (settings.currentContent == "timeline") {
      TweenLite.staggerFrom("#timeline g", 1, { x: 1000, ease: Power1.easeOut }, 0.2);
      //go through array timeline
      timelineArray.forEach(addClickToYear);

      //add class to content container thats called timeline and remove previous
      modal_content.classList.add("timeline-grid");
    }
    ///////////////////////////////////////////////

    if (settings.currentContent == "filament-game") {
      fetchGameSVG();
    } else if (settings.currentContent == "process-conclusion") {
      console.log("hi");
      fetchMaterialsSVG();
    } else if (settings.currentContent == "congratulations-message") {
      fetchBambooSVG();
      //fetchSVGToContentBamboo("theBamboo.svg");
    } else if (settings.currentContent == "process-intro") {
      //remove prevous scene class to .content
      modal_content.classList.remove("timeline-grid");
      fetchBooksSVG();
    } else if (settings.currentContent == "technology") {
      fetchPowerPlant();
    } else if (settings.currentContent == "work-impact") {
      fetchFactory();
    } else if (settings.currentContent == "process-curiosity") {
      fetchLamp();
    } else if (settings.currentContent == "lifestyle-impact") {
      fetchHouse();
    } else if (settings.currentContent == "timeline-intro") {
      fetchTorchLampsSVG();
    }
  }
}

function addClickToYear(yearObject) {
  //select the button for the object
  document.getElementById(`${yearObject.yearID}`).addEventListener("click", () => {
    changeTimelineContent(yearObject);
  });
}

function changeTimelineContent(timelineYear) {
  console.log("change modal");
  const templateTimeline = document.querySelector("template.timeline").content;
  const templateCopy = templateTimeline.cloneNode(true);

  console.log("CLONE");
  console.log(templateCopy);

  //   change text of timeline-text
  const timelineText = templateCopy.querySelector(".timeline-text p");
  timelineText.innerHTML = timelineYear.text;

  console.log("year" + timelineYear.yearID);
  //change timeline-image if the user clicked on a year before
  fetchSVGToContentTimeline(timelineYear.image, ".timeline-image");

  console.log(templateCopy);
  const modal_content = document.querySelector(".content");
  modal_content.innerHTML = "";
  modal_content.appendChild(templateCopy);

  //change active color
  document.querySelector(`#${timelineYear.yearID} .timelineSVG-1`).style.fill = "#ffff00";

  //add animation to text and image
  gsap.fromTo(".content .timeline-text", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 10, duration: 0.5 });
  gsap.fromTo(".content .timeline-image", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 10, duration: 1, delay: 0.5 });

  timelineArray.forEach(addClickToYear);
}

function addClickNext() {
  const nextBTN = document.querySelector(".next");

  nextBTN.addEventListener("click", btn => {
    contentCurrentIndex++;
    updateStatus(btn.target.className);
    updateModal();
  });
}

function addClickPrevious() {
  const previousBTN = document.querySelector(".back");

  previousBTN.addEventListener("click", btn => {
    console.log(btn.target.className);
    contentCurrentIndex--;
    updateStatus(btn.target.className);
    updateModal();
  });
}

function animateBubbles() {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach(animate);

  const instructions = document.createElement("p");
  instructions.textContent = "Click on the lamp to insert the material you selected!";
  instructions.classList.add("instructions");
  document.querySelector(".content").appendChild(instructions);
  animateInstructions();
}

function random() {
  const num = Math.random() * 0.5;
  console.log(num);

  return num;
}
let delayed = 0;

function animate(bubble) {
  console.log(delayed + " " + bubble.id);
  TweenLite.from(bubble, 1.8, {
    y: -20,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random()
  });

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
  document.querySelector("#lamp").addEventListener("click", checkMaterial);
}

function checkMaterial() {
  console.log("hola");

  if (clicked == "bamboo") {
    console.log("That's right!");

    document.querySelector(".Lampst6").classList.remove("hidden");
    document.querySelector(".Lampst55").classList.remove("hidden");
    console.log("after");

    document.querySelector(".Lampst55").style.stroke = "orange";

    //create winMessage element
    const winMessage = document.createElement("h1");
    winMessage.textContent = "Well done! You found it!";
    winMessage.classList.add("win-message");
    document.querySelector(".content").appendChild(winMessage);
    animateWinMessage();
  } else {
    const lamp = document.querySelector("#lamp");
    TweenLite.to(lamp, 0.1, {
      x: +5,
      repeat: 3,
      yoyo: true,
      ease: Power1.linear
    });
    TweenLite.to(
      lamp,
      0.1,
      {
        x: -5,
        ease: Power1.linear
      },
      0.2
    );

    console.log("Wrong!");
  }
}

function animatePowerPlant() {
  const smoke = document.getElementById("smoke-1");
  TweenMax.to(smoke, 0.5, {
    x: "+=10",
    y: "+4",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(smoke, 0.5, {
    x: "-=10",
    y: "-4",
    yoyo: true,
    repeat: -1
  });
  const element = document.getElementById("smoke-2");
  TweenMax.to(element, 0.4, {
    x: "+=20",
    y: "+2",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.4, {
    x: "-=20",
    y: "-2",
    yoyo: true,
    repeat: -1
  });
}

function animateFactory() {
  const element = document.getElementById("factory-smoke");
  TweenMax.to(element, 0.5, {
    x: "+=10",
    y: "+4",
    yoyo: true,
    repeat: -1
  });
  TweenMax.to(element, 0.5, {
    x: "-=2",
    y: "-4",
    yoyo: true,
    repeat: -1
  });
}

function animateFlames() {
  TweenMax.from(".fire", 1, { scaleY: 0, ease: Elastic.easeOut, delay: 1.5 });
  TweenLite.to(".fire", 1, { scale: 1.1, repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 2.5 });
}

function animateTorchLamps() {
  gsap.fromTo("#torch", 0.8, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut, delay: 0.3 });
  gsap.fromTo("#yellow_torch", 0.5, { rotate: -10, transformOrigin: "bottom" }, { rotate: 10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut });
  gsap.fromTo("#orange_torch", 0.3, { rotate: 10, transformOrigin: "bottom" }, { rotate: -10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut });
  gsap.fromTo("#red_torch", 0.2, { rotate: -5, transformOrigin: "bottom" }, { rotate: 5, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut });

  gsap.fromTo("#candle", 0.8, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut, delay: 1.5 });
  gsap.fromTo("#yellow_flame", 0.5, { rotate: -10, transformOrigin: "bottom" }, { rotate: 10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.2 });
  gsap.fromTo("#orange_flame", 0.3, { rotate: 10, transformOrigin: "bottom" }, { rotate: -10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.2 });
  gsap.fromTo("#red_flame", 0.2, { rotate: -5, transformOrigin: "bottom" }, { rotate: 5, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.2 });

  gsap.fromTo("#gass-lamp", 0.8, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut, delay: 2.7 });
  gsap.fromTo("#yellow_flame_lamp", 0.5, { rotate: -10, transformOrigin: "bottom" }, { rotate: 10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.4 });
  gsap.fromTo("#orange_flame_lamp", 0.3, { rotate: 10, transformOrigin: "bottom" }, { rotate: -10, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.4 });
  gsap.fromTo("#red_flame_lamp", 0.2, { rotate: -5, transformOrigin: "bottom" }, { rotate: 5, transformOrigin: "bottom", repeat: -1, yoyo: true, ease: Power1.easeInOut, delay: 0.4 });
}

function animateBooks() {
  gsap.fromTo("#bigbooks", 0.8, { opacity: 0 }, { opacity: 1, ease: Power1.easeInOut, delay: 0.8 });
}

function animateFinalMessage() {
  gsap.fromTo(".finalMessage", 1, { x: -1000, opacity: 0 }, { x: 0, opacity: 0.7, ease: Bounce.easeOut, delay: 5 });
}

function animateInstructions() {
  gsap.fromTo(".instructions", 1, { scale: 0 }, { scale: 1, ease: Power1.easeInOut, transformOrigin: "left" });
}

function animateWinMessage() {
  gsap.fromTo(".win-message", 1, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.7, ease: Power1.easeInOut, transformOrigin: "center" });
}

function animateRestartBTN() {
  gsap.to(".restart", 1, { scale: 1.3, yoyo: true, repeat: -1, ease: Power1.easeInOut, delay: 5 });
}

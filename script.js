import { gsap } from "gsap";
import { TweenLite } from "gsap/all";
import { TweenMax } from "gsap/all";
import { TimelineMax } from "gsap/all";
import { Power1 } from "gsap/all";
import { Bounce } from "gsap/all";
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
  //changeViewBox();
  fetchAllImages();
  fetchTimeline();
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

function fetchAllImages() {
  fetchImage("timeline.svg", ".timeline ");
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

async function fetchPowerPlant() {
  let response = await fetch("power-plant.svg");
  let mySVGData = await response.text();
  document.querySelector("section.power-plant").innerHTML += mySVGData;
  animatePowerPlant();
}

function animatePowerPlant() {
  const smoke = document.querySelector("#power-plant");
}

async function fetchBambooSVG() {
  let response = await fetch("theBamboo.svg");
  let mySVGData = await response.text();
  document.querySelector(".content").innerHTML += mySVGData;
  animateBamboo();
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
      modal_content.classList.remove("timeline-grid");
      //   fetchBambooSVG();
    } else if (settings.currentContent == "technology") {
      fetchPowerPlant();
    } else if (settings.currentContent == "work-impact") {
      fetchFactory();
    } else if (settings.currentContent == "process-curiosity") {
      fetchLamp();
    }
  }
}

function addClickToYear(yearObject) {
  //select the button for the object
  document.getElementById(`${yearObject.yearID}`).addEventListener("click", () => {
    console.log("button Clicked");
    // if (document.querySelector(`.content .timeline-text`)) {

    //   TweenMax.to(".content .timeline-text", 0.5, { opacity: 0 });
    //   TweenMax.to(".content .timeline-image", 0.3, { opacity: 0 });
    //   TweenMax.to(".content .timeline-text", 0.3, { opacity: 0, delay: 0.5 });
    //   TweenMax.to(".content .timeline-image", 0.5, { opacity: 0, delay: 0.5 });
    // }
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
  timelineText.textContent = timelineYear.text;

  console.log("year" + timelineYear.yearID);
  //change timeline-image
  if (timelineYear.image) {
    //   const imageCreated = document.createElement("p");
    fetchSVGToContentTimeline(timelineYear.image, ".timeline-image");

    const timelineImage = templateCopy.querySelector(".timeline-image");
    // timelineImage.textContent = timelineYear.image;

    timelineImage.style.width = "100px";
  }

  console.log(templateCopy);
  const modal_content = document.querySelector(".content");
  modal_content.innerHTML = "";
  modal_content.appendChild(templateCopy);

  gsap.fromTo(".content .timeline-text", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 10, duration: 0.5 });
  gsap.fromTo(".content .timeline-image", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 10, duration: 1, delay: 0.5 });

  timelineArray.forEach(addClickToYear);
}

function updateTimelinePage(contentToUpdate) {
  const modal_content = document.querySelector(".content");
  modal_content.innerHTML = "";
  //   modal_content.appendChild(contentToUpdate);

  modal_content.appendChild(timelineImage);
  modal_content.appendChild(timelineText);
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

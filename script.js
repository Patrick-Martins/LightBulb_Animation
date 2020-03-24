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
  turnOnTheLight();
  turnOnTheTV();
  turnOnTheWM();

  //document.getElementById("room").setAttribute("viewBox", "270 120 100 100");
}
/****************** STANDLAMP ANIMATION ***********************************/

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

/*********************** WASHINGMACHINE ANIMATION *********************************************/

//Makes the washing-machine clickable --> calls tte animation
function turnOnTheWM() {
  document.querySelectorAll("#washing-machine").forEach(element => {
    element.addEventListener("click", wash);
    console.log(element);
  });
}

//Washingmachine starts shaking
function wash() {
  var washingMachine = document.getElementById("washing-machine-glass");
  washingMachine.classList.toggle("wash");
}

/************************* TV ANIMATION *********************************************************/
//Makes the TV clickable --> calls the animation
function turnOnTheTV() {
  document.querySelectorAll("#tv").forEach(element => {
    element.addEventListener("click", tvOn);
    console.log(element);
  });
}

// function tvOn() {
//   antiClockwiseSpin();
//   clockwiseSpin();
// }

function tvOn() {
  var tvButtonTop = document.getElementById("topbutton-tv");
  var tvButtonBottom = document.getElementById("bottombutton-tv");
  tvButtonTop.classList.toggle("spin");
  tvButtonBottom.classList.toggle("spin");
}

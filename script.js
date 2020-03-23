function turnOnTheLight() {
  document.querySelectorAll(".cls-87, .cls-88").forEach(element => {
    element.addEventListener("click, lightOn");
  });
}

function lightOn(evt) {
  console.log(evt.target);
}

const numOfDots = 9;
const dotSpeed = 200;
let currentDot = 0;
var dotBaseWidth = 10;
var dotMaxWidth = 25;
var dotStep = 4;

//true=right false=left
var dotDirection = true;
//

export function makeDots() {
  const dotContainer = document.querySelector(".dot_container");
  for (let i = 0; i < numOfDots; i++) {
    const currentDot = `<div class="dot_${i} dot"></div>`;
    dotContainer.innerHTML += currentDot;
  }
}

function moveDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.style.width = "10px";
    dot.style.background = "#002632";
  });
  try {
    dots[currentDot].style.width = `${dotMaxWidth}px`;
    dots[currentDot].style.background = "#002632";
    if (dots[currentDot - 1]) {
      dots[currentDot - 1].style.width = `${dotMaxWidth - dotStep * 1}px`;
    }
    if (dots[currentDot + 1]) {
      dots[currentDot + 1].style.width = `${dotMaxWidth - dotStep * 1}px`;
    }
    if (dots[currentDot - 2]) {
      dots[currentDot - 2].style.width = `${dotMaxWidth - dotStep * 2}px`;
    }
    if (dots[currentDot + 2]) {
      dots[currentDot + 2].style.width = `${dotMaxWidth - dotStep * 2}px`;
    }
    if (dots[currentDot - 3]) {
      dots[currentDot - 3].style.width = `${dotMaxWidth - dotStep * 3}px`;
    }
    if (dots[currentDot + 3]) {
      dots[currentDot + 3].style.width = `${dotMaxWidth - dotStep * 3}px`;
    }
    if (dots[currentDot - 4]) {
      dots[currentDot - 4].style.width = `${dotMaxWidth - dotStep * 4}px`;
    }
    if (dots[currentDot + 4]) {
      dots[currentDot + 4].style.width = `${dotMaxWidth - dotStep * 4}px`;
    }
    if (dots[currentDot - 5]) {
      dots[currentDot - 5].style.width = `${dotMaxWidth - dotStep * 5}px`;
    }
    if (dots[currentDot + 5]) {
      dots[currentDot + 5].style.width = `${dotMaxWidth - dotStep * 5}px`;
    }
    if (dots[currentDot - 6]) {
      dots[currentDot - 6].style.width = `${dotMaxWidth - dotStep * 6}px`;
    }
    if (dots[currentDot + 6]) {
      dots[currentDot + 6].style.width = `${dotMaxWidth - dotStep * 6}px`;
    }
  } catch (error) {}
}

export function dotsTimer() {
  setInterval(() => {
    if (currentDot === numOfDots - 1) {
      dotDirection = false;
    }
    if (currentDot === 0) {
      dotDirection = true;
    }
    if (dotDirection) {
      currentDot = currentDot + 1;
    } else {
      currentDot = currentDot - 1;
    }
    const dotContainer = document.querySelector(".dot_container");
    if (dotContainer) {
      moveDots();
    } else {
      return;
    }
  }, dotSpeed);
}

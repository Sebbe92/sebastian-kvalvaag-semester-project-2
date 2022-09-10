const amoutOfSlides = 5;
const slideWidth = 300;

let mainSlide = Math.floor(amoutOfSlides / 2);

export function insertCarousel(container) {
  let newHtml = "";
  for (let i = 0; i < amoutOfSlides; i++) {
    newHtml += `<a href="" id="${i}" class ="slide_card slide${
      i + 1
    }" >slide${i}</a>`;
  }
  container.innerHTML = newHtml;
  const slides = document.querySelectorAll(".slide_card");
  slides.forEach((slide) => {
    if (slide.id == mainSlide) {
      slide.classList.add("active");
    }
    slide.addEventListener("mouseenter", (e) => {
      mainSlide = e.path[0].id;
      swapClass();
    });
  });
  swapClass();
}

function swapClass() {
  let i = 0;
  const slides = document.querySelectorAll(".slide_card");

  slides.forEach((slide) => {
    i++;

    try {
      slide.classList.remove("active");
      if (slide.id < mainSlide) {
        slide.style.transform = "rotate3D(0,1,0,45deg)";
        slide.style.zIndex = `${i}`;
      } else if (slide.id > mainSlide) {
        slide.style.transform = "rotate3D(0,1,0,-45deg)";
        slide.style.zIndex = `${-i}`;
      } else {
        slide.style.transform = "rotate3D(0,1,0,0deg) scale(150%)";
        slide.style.zIndex = `1000`;
      }
    } catch (error) {
      console.log(error);
    }
  });
  if (slides[mainSlide].classList) {
    slides[mainSlide].classList.add("active");
  }
}

function cycleSlides(opperation) {
  if (opperation) {
    mainSlide++;
  } else {
    mainSlide--;
  }
}

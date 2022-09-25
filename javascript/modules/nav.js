import {
  navHeight,
  navBarContainer,
  snapScrollContainer,
  navBarBtn,
  main,
} from "../utils/constants.js";

export function navBarSetup() {
  if (window.innerWidth <= 992) {
    navBarContainer.style.transform = `translateY(-200px)`;
    navBarContainer.style.zIndex = "-1";
    navBarBtn.addEventListener("click", handleNavDropdown);
  } else {
    navBarContainer.style.transform = "translateY(0)";
    navBarContainer.style.zIndex = "1";
  }
}
function handleNavDropdown(e) {
  if (navBarContainer.style.transform == `translateY(${navHeight}px)`) {
    navBarContainer.style.transform = "translateY(-200px)";
  } else {
    console.log(navBarContainer.style.transform);
    navBarContainer.style.transform = `translateY(${navHeight}px)`;
  }
}
function handleNavDropdownClose(e) {
  navBarContainer.style.transform = "translateY(-200px)";
}

//sec nav

import {
  navHeight,
  navBarContainer,
  snapScrollContainer,
  navBarBtn,
  main,
} from "../utils/constants.js";
import { getLocalUser } from "../utils/utils.js";
import { loginFormSetup, logout } from "./login.js";

export function navBarSetup() {
  /* const aboutBtn = document.querySelector("#about-btn");
  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.pathname = "/index.html";
    setTimeout(() => {
      location.search = "about";
    }, 50);
  }); */

  if (getLocalUser() && navBarContainer.children[0].children.length < 4) {
    console.log();
    navBarContainer.children[0].innerHTML += `<li class="nav-item">
    <a
      class="nav-link position-relative test-btn active"
      aria-current="page"
      href="#"
      id="logout"
    >
      <p class="position-absolute btn-font-big m-0">Logout</p>
      <p class="btn-font-small m-0">Logout</p>
    </a>
  </li>`;

    const logoutBtn = document.querySelector("#logout");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      navBarSetup();
    });
  }
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
    navBarContainer.style.transform = `translateY(${navHeight}px)`;
  }
}
function handleNavDropdownClose(e) {
  navBarContainer.style.transform = "translateY(-200px)";
}

//sec nav

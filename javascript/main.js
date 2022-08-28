import { loginFormSetup } from "./modules/login.js";

//move too variables file
const loginForm = document.querySelector("#login_form");
const dropdown = document.querySelectorAll(".dropdown-toggle");

/* loginFormSetup(loginForm); */

console.log("hello");
function dropDownMenu(dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.path[1].children[1].classList.toggle("d-block");
      e.path[1].children[1].classList.toggle("d-none");
    });
  });
}
dropDownMenu(dropdown);

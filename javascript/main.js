import { loginFormSetup } from "./modules/login.js";

//move too variables file
const loginForm = document.querySelector("#login_form");

loginFormSetup(loginForm);

console.log(JSON.parse(localStorage.getItem("userjwt")));

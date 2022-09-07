import { clearForm, validateLength } from "../utils/validation.js";
import { user } from "./user.js";

const minLen = 2;
const adminUrl = "https://it-suites-you.herokuapp.com/auth/local";
export function loginFormSetup(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = e.path[0][0].value;
    const password = e.path[0][1].value;
    if (validateLength(userName, minLen) && validateLength(password, minLen)) {
      const currentUser = new user(adminUrl, userName, password);
      currentUser.login();
      clearForm(e);
    } else {
      console.log("wrong!");
    }
  });
}

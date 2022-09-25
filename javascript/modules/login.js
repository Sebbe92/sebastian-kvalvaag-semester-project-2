import { removeUserMessage, userMessage } from "../utils/utils.js";
import { clearForm, validateLength } from "../utils/validation.js";
import { user } from "./user.js";

const minLen = 2;
const adminUrl = "https://it-suites-you.herokuapp.com/auth/local";
export async function loginFormSetup(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = e.path[0][0].value;
    const password = e.path[0][1].value;
    if (validateLength(userName, minLen) && validateLength(password, minLen)) {
      removeUserMessage();
      const currentUser = new user(adminUrl, userName, password);
      currentUser.login().then(() => {
        console.log(currentUser.jwt);
        if (!currentUser.jwt == "") {
          userMessage("Success!");
          redirect("add-products.html");
        } else {
          userMessage("invalid username or password");
        }
        clearForm(e);
      });
    } else {
      userMessage("name and password needs to be atleast 2 letters");
    }
  });
}

export function logout() {
  localStorage.removeItem("user");
}

export function redirect(page) {
  location.href = `${page}`;
}

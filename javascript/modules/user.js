import { getJWT } from "./apiCalls.js";

export class user {
  constructor(url, userName, password) {
    this.url = url;
    this.userName = userName;
    this.password = password;
    this.jwt = "";
  }
  login() {
    getJWT(this.url, this.userName, this.password).then((jwt) => {
      this.jwt = jwt;
      if (this.jwt) {
        this.password = "";
        localStorage.setItem("userjwt", JSON.stringify(this));
        console.log("logged in");
      } else {
        console.log("error");
        return false;
      }
    });
  }
}

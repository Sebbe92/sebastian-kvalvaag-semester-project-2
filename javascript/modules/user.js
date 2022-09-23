import { getJWT } from "./apiCalls.js";

export class user {
  constructor(url, userName, password) {
    this.url = url;
    this.userName = userName;
    this.password = password;
  }
  async login() {
    await getJWT(this.url, this.userName, this.password).then((jwt) => {
      this.jwt = jwt;
      if (this.jwt) {
        this.password = "";
        localStorage.setItem("user", JSON.stringify(this));
        console.log(this.jwt);
      } else {
        console.log("error");
        return false;
      }
    });
  }
}

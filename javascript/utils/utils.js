import { user } from "../modules/user.js";

export function imagePreview(images) {
  let imgElement = "";

  for (let i = 0; i < images.length; i++) {
    imgElement += `<img src="${images[i].formats.small.url}" class"preview-img"/>`;
  }

  return imgElement;
}
export function getLocalUser() {
  return JSON.parse(localStorage.getItem("user"));
}

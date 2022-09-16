import { user } from "../modules/user.js";

export function imagePreview(images) {
  let imgElement = `<div class="col-12 d-flex justify-content-between">`;
  console.log(images);
  for (let i = 0; i < images.length; i++) {
    imgElement += `<div class="small-img col-3">
    <img
    
    src="${images[i].formats.thumbnail.url}"/>
    <p>${images[i].name}</p>
    <button
    class="x remove-img" id ="${images[i].id}">Remove</button>
  </div>`;
  }

  imgElement += `</div>`;
  return imgElement;
}
export function getLocalUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function userMessage(message) {
  console.log(message);
}

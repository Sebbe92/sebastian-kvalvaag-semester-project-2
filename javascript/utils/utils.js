import { user } from "../modules/user.js";

export function imagePreview(images) {
  let imgElement = `<div class="container-fluid row row-cols-2">`;
  for (let i = 0; i < images.length; i++) {
    imgElement += `<div class="col d-flex flex-column">
    <img
    src="${images[i].formats.small.url}"/>
    <p>${images[i].name}</p>
    <button
    class="btn x remove-img bg-danger" id ="${images[i].id}">Remove</button></div>
  `;
  }

  imgElement += `</div>`;
  return imgElement;
}
export function getLocalUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function userMessage(message) {
  const messageContainer = document.querySelector("#message-container");
  messageContainer.innerHTML = `${message}`;
}
export function removeUserMessage() {
  const messageContainer = document.querySelector("#message-container");
  messageContainer.innerHTML = ``;
}

export function addToShoppingCart(item) {
  if (!localStorage.getItem("shoppingcart")) {
    localStorage.setItem("shoppingcart", JSON.stringify([]));
  }
  const currentCart = JSON.parse(localStorage.getItem("shoppingcart"));
  currentCart.push(item[0]);
  localStorage.setItem("shoppingcart", JSON.stringify(currentCart));
}
export function removeFromShoppingCart(id) {
  if (!localStorage.getItem("shoppingcart")) {
    alert("empty shopping cart");
  }
  const currentCart = JSON.parse(localStorage.getItem("shoppingcart"));

  currentCart.splice(id, 1);
  localStorage.setItem("shoppingcart", JSON.stringify(currentCart));
}

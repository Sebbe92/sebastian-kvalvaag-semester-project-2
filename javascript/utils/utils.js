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

export function addToShoppingCart(item) {
  if (!localStorage.getItem("shoppingcart")) {
    localStorage.setItem("shoppingcart", JSON.stringify([]));
  }
  const currentCart = JSON.parse(localStorage.getItem("shoppingcart"));
  currentCart.push(item);
  localStorage.setItem("shoppingcart", JSON.stringify(currentCart));
}
export function removeFromShoppingCart(id) {
  if (!localStorage.getItem("shoppingcart")) {
    alert("empty shopping cart");
  }
  const currentCart = JSON.parse(localStorage.getItem("shoppingcart"));

  currentCart.splice(id, 1);
  console.log(
    currentCart,
    currentCart.filter((item) => {
      return item.id == id;
    })
  );
  localStorage.setItem("shoppingcart", JSON.stringify(currentCart));
}

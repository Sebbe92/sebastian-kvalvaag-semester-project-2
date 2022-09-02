import { getProduct, postProduct, uploadImg } from "./modules/apiCalls.js";
import { loginFormSetup } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import { imagePreview } from "./utils/utils.js";

getProduct(13).then((productObject) => {
  const currentProduct = new product(
    productObject.title,
    productObject.price,
    productObject.description
  );
  currentProduct.parseDescription();
  console.log(currentProduct);
});
const productForm = document.querySelector("#product_form");

const productContainer = document.querySelector("#product_container");

const currentUser = localStorage.getItem("user");
//move too variables file
const loginForm = document.querySelector("#login_form");
const dropdown = document.querySelectorAll(".dropdown-toggle");

/* loginFormSetup(loginForm); */

function dropDownMenu(dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.path[1].children[1].classList.toggle("d-block");
      e.path[1].children[1].classList.toggle("d-none");
    });
  });
}
/* dropDownMenu(dropdown); */

/* createProductPage(fakeProduct, productContainer); */
const tempjwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxOTE0MDQ1LCJleHAiOjE2NjQ1MDYwNDV9.MTPzWqPRUKqvZXrd9c2aH_VpslKlMSHRWQayPurU0TI";

const formImages = document.querySelector("#images");
const uploadPreview = document.querySelector("#upload-preview");

formImages.addEventListener("change", (e) => {
  imagePreview(e, uploadPreview);
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  makeProductFromForm(e);
});

async function makeProductFromForm(e) {
  /* const imgInfo = getImageObject(await uploadImg(e.target, tempjwt)); */

  const newProduct = new product(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value
  );
  newProduct.createProduct(tempjwt);
}

function getImageObject(listofObjects) {
  const imgObjects = [];
  listofObjects.forEach((object) => {
    imgObjects.push(object.formats);
  });
  return imgObjects;
}

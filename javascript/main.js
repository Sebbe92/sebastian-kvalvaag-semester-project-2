import { getProduct, postProduct, uploadImg } from "./modules/apiCalls.js";
import { loginFormSetup } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import { makeForm } from "./modules/forms.js";
import { getLocalUser, imagePreview } from "./utils/utils.js";
import {
  productFormContainer,
  body,
  loginForm,
  dropdown,
  productContainer,
  currentUser,
} from "./utils/constants.js";
let currentProduct = {};
if (productFormContainer) {
  makeForm(productFormContainer);
}
const productPreviewContainer = document.querySelector(
  "#product-preview_container"
);

if (productContainer) {
  /* getProduct(7).then((productObject) => {
    currentProduct = new product(
      productObject.title,
      productObject.price,
      productObject.description,
      productObject.color,
      productObject.size,
      productObject.specs,
      productObject.image_url
    );
    currentProduct.parseLists();
    currentProduct.getImageDetails().then(() => {
      currentProduct.createProductPage(productContainer);
      console.log(currentProduct);
    });
  }); */
}

console.log(JSON.parse(localStorage.getItem("user")));
if (loginForm) {
  loginFormSetup(loginForm);
}
getLocalUser();
const tempjwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxOTE0MDQ1LCJleHAiOjE2NjQ1MDYwNDV9.MTPzWqPRUKqvZXrd9c2aH_VpslKlMSHRWQayPurU0TI";

async function pushFilesToUpload(fileEvents) {
  fileEvents.forEach(async (fileEvent) => {
    console.log(await uploadImg(fileEvent.path[2], tempjwt));
  });
}

function getImageObject(listofObjects) {
  const imgObjects = [];
  listofObjects.forEach((object) => {
    imgObjects.push(object.formats);
  });
  return imgObjects;
}

import { getProduct, postProduct, uploadImg } from "./modules/apiCalls.js";
import { loginFormSetup } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import {
  makeForm,
  makeDropdownHtml,
  addDropdownListeners,
} from "./modules/forms.js";
import { getLocalUser, imagePreview } from "./utils/utils.js";
import {
  productFormContainer,
  body,
  loginForm,
  dropdown,
  productContainer,
  currentUser,
} from "./utils/constants.js";
import { insertCarousel } from "./modules/carousel.js";

const navBarContainer = document.querySelector("#navbarSupportedContent");

const navBarBtn = document.querySelector("nav .navbar-toggler");

const main = document.querySelector("main");

if (window.innerWidth <= 1001) {
  navBarContainer.style.transform = "translateY(-200px)";
  navBarBtn.removeEventListener("click", handleNavDropdown);
  navBarBtn.addEventListener("click", handleNavDropdown);
} else {
  navBarContainer.style.transform = "translateY(0)";
}
window.addEventListener("resize", () => {
  if (window.innerWidth <= 1001) {
    navBarContainer.style.transform = "translateY(-200px)";
    navBarBtn.removeEventListener("click", handleNavDropdown);
    navBarBtn.addEventListener("click", handleNavDropdown);
  } else {
    navBarContainer.style.transform = "translateY(0)";
    main.removeEventListener("pointerenter", handleClose);
  }
});
function handleNavDropdown(e) {
  if (e.path[2].children[2].style.transform == "translateY(50px)") {
    e.path[2].children[2].style.transform = "translateY(-200px)";
  } else {
    e.path[2].children[2].style.transform = "translateY(50px)";
    main.addEventListener("pointerenter", handleClose);
  }
}
function handleClose(e) {
  console.log(e.path[2].children[2].style.transform);
  navBarContainer.style.transform = "translateY(-200px)";
}
let currentProduct = {};
if (productFormContainer) {
  makeForm(productFormContainer);
}
const productPreviewContainer = document.querySelector(
  "#product-preview_container"
);
const colors = ["red", "green"];

if (productContainer) {
  getProduct(4).then((productObject) => {
    currentProduct = new product(
      productObject.title,
      productObject.price,
      productObject.description,
      productObject.color,
      productObject.size,
      productObject.specs,
      productObject.image_url
    );
    console.log(currentProduct);
    currentProduct.parseLists();
    currentProduct.getImageDetails().then(() => {
      currentProduct.createProductPage(productContainer);
      console.log(currentProduct);
    });
  });
}

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

const testFont = document.querySelector("#testFont");

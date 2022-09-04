import { getProduct, postProduct, uploadImg } from "./modules/apiCalls.js";
import { loginFormSetup } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import { addDropdownListeners, makeForm } from "./modules/forms.js";
import { imagePreview } from "./utils/utils.js";
import {
  productFormContainer,
  body,
  dropdownLis,
  productForm,
  loginForm,
  dropdown,
  productContainer,
  currentUser,
} from "./utils/constants.js";

if (productFormContainer) {
  makeForm(productFormContainer);
}
if (productContainer) {
  getProduct(30).then((productObject) => {
    const currentProduct = new product(
      productObject.title,
      productObject.price,
      productObject.description
    );
    currentProduct.parseDescription();
    currentProduct.makeDescriptionObject();
    currentProduct.createProductPage(body);
    console.log(currentProduct);
    /* createProductPage(currentProduct, productContainer); */
  });
}

if (loginForm) {
  loginFormSetup(loginForm);
}

dropdownLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    if (!e.target.children[0].checked) {
      e.target.children[0].checked = true;
    } else {
      e.target.children[0].checked = false;
    }
  });
});

addDropdownListeners();


const tempjwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxOTE0MDQ1LCJleHAiOjE2NjQ1MDYwNDV9.MTPzWqPRUKqvZXrd9c2aH_VpslKlMSHRWQayPurU0TI";
let filesToUpload = [];
let imageInfo = [];
const formImages = document.querySelector("#images");
const uploadPreview = document.querySelector("#upload-preview");
if (formImages) {
  formImages.addEventListener("change", (e) => {
    filesToUpload.push(e);
    imagePreview(e, uploadPreview);
    console.log(filesToUpload);
  });
}
if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    makeProductFromForm(e);
  });
}
async function pushFilesToUpload(fileEvents) {
  fileEvents.forEach(async (fileEvent) => {
    console.log(await uploadImg(fileEvent.path[2], tempjwt));
  });
}
async function makeProductFromForm(e) {
  const colors = [];
  const sizes = [];
  const categories = [];
  const image_url = imageInfo;
  filesToUpload.forEach((file) => {
    pushFilesToUpload(file);
  });
  for (var i = 0; i < e.target.length; i++) {
    const input = e.target[i];

    if (input.name == "Colors" && input.checked == true) {
      colors.push(input.id);
    } else if (input.name == "Sizes" && input.checked == true) {
      sizes.push(input.id);
    } else if (input.name == "Categories" && input.checked == true) {
      categories.push(input.id);
    }
  }
  const newDescription = [colors, sizes, categories, e.target[2].value];
  const newProduct = new product(
    e.target[0].value,
    e.target[1].value,
    newDescription,
    image_url
  );

  /* newProduct.concatDescription();
  newProduct.createProduct(tempjwt); */
}

function getImageObject(listofObjects) {
  const imgObjects = [];
  listofObjects.forEach((object) => {
    imgObjects.push(object.formats);
  });
  return imgObjects;
}

import { getLocalUser, imagePreview } from "../utils/utils.js";
import { getJWT, uploadImg } from "./apiCalls.js";
import { product } from "./product.js";

const productColors = ["red", "green", "blue", "gray", "black", "white"];
const productCategories = ["full-suite", "shirt", "pants", "jackets"];
const productSizes = ["xl", "l", "m", "s"];

const uploadedFiles = [];

//make product form use insert container or enter false for the input you dont want makeForm(testContainer);
export function makeForm(
  displayContainer,
  title = true,
  price = true,
  description = true,
  categories = true,
  colors = true,
  sizes = true,
  files = true
) {
  let formHtml = `<form action="#" class="col-lg-6 d-flex flex-column" id="product_form">`;
  if (title) {
    formHtml += `<label for="title">Product title</label>
<input type="text" name="title" id="title" />`;
  }
  if (price) {
    formHtml += `<label for="price">Product Price</label>
    <input type="number" name="price" id="price" />`;
  }
  if (description) {
    formHtml += `<label
    for="
product-description"
    >Product Description</label
  >
  <textarea
    name="product-description"
    id="product-description"
    cols="30"
    rows="10"
  ></textarea>`;
  }
  formHtml += `<div class="d-flex">`;
  if (categories) {
    formHtml += makeDropdownHtml("Categories", productCategories);
  }
  if (colors) {
    formHtml += makeDropdownHtml("Colors", productColors);
  }
  if (sizes) {
    formHtml += makeDropdownHtml("Sizes", productSizes);
  }
  formHtml += `</div>`;

  formHtml += `<button type="submit" class="btn btn-primary">Preview</button></form>`;

  displayContainer.innerHTML += formHtml;
  imageUploadForm(displayContainer);
  imageUploadSubmit();
  productFormSubmit();
  addDropdownListeners();
}

function imageUploadForm(container) {
  container.innerHTML += `<form id="upload_form">
    <input
      type="file"
      name="files"
      id="images"
      accept="images/jpeg"
      class="drag-n-drop"
      multiple
    />
  <button class="btn" id="upload-btn">Upload</button>
  </form><div id="upload-preview"></div>`;
}
function imageUploadSubmit() {
  const imageUploadForm = document.querySelector("#upload_form");
  const uploadPreview = document.querySelector("#upload-preview");
  imageUploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadPreview.innerHTML = `<div class="loader">loading...</div>`;
    const data = new FormData(e.target);
    uploadImg(data, getLocalUser().jwt).then((imgs) => {
      imgs.forEach((img) => {
        uploadedFiles.push(img);
      });
      console.log(uploadedFiles);
      uploadPreview.innerHTML = imagePreview(uploadedFiles);
    });
  });
}

function makeDropdownHtml(label, trait) {
  let container = "";
  container += `<div class="dropdown bg-white my-2 mx-1">
    <div class="dropdown_button bg-white rounded-1 px-3">
      ${label} v
    </div>
    <ul class="dropdown_list" id="${label}">`;
  trait.forEach((item) => {
    container += `<li>
    <input type="checkbox" id="${item}" name = "${label}"/> <label for="${item}">${item}</label>
  </li>`;
  });
  container += `</ul>
  </div>`;
  return container;
}
function dropdownClose() {
  console.log(this.children[1]);
  this.children[1].classList.remove("active");
  this.removeEventListener("pointerleave", dropdownClose);
}
function addDropdownListeners() {
  const dropdownButtons = document.querySelectorAll(".dropdown_button");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.nextSibling.nextSibling.classList.toggle("active");

      console.log(button.parentElement.id);
      button.parentElement.addEventListener("pointerleave", dropdownClose);
    });
  });
  const dropdownLis = document.querySelectorAll(".dropdown li");
  dropdownLis.forEach((li) => {
    li.addEventListener("click", (e) => {
      if (!e.target.children[0]) {
      } else {
        if (e.target.children[0].checked) {
          e.target.children[0].checked = false;
        } else {
          e.target.children[0].checked = true;
        }
      }
    });
  });
}

async function makeProductFromForm(e, images) {
  console.log(e.target);
  const imgIds = [];
  const colors = [];
  const sizes = [];
  const categories = [];
  images.forEach((img) => {
    imgIds.push(img.id);
  });
  for (let i = 0; i < e.target.length; i++) {
    console.log(e.target[i].name);
    if (e.target[i].name == "Colors" && e.target[i].checked) {
      colors.push(e.target[i].id);
    }
    if (e.target[i].name == "Sizes" && e.target[i].checked) {
      sizes.push(e.target[i].id);
    }
    if (e.target[i].name == "Categories" && e.target[i].checked) {
      categories.push(e.target[i].id);
    }
  }
  console.log(colors);

  const newProduct = new product(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    colors,
    sizes,
    categories,
    imgIds
  );
  console.log(newProduct, "before");
  const displayContainer = document.querySelector("#product_container");
  newProduct.getImageDetails().then(() => {
    newProduct.createProductPage(displayContainer);
    displayContainer.innerHTML += `<button id="publish-btn">Publish</button>`;
    const publishBtn = document.querySelector("#publish-btn");
    publishBtn.addEventListener(() => {
      newProduct.publishProduct();
    });
  });

  /* newProduct.stringifyLists();
  newProduct.createProduct();
  console.log(newProduct, "after"); */
}
function productFormSubmit() {
  const productForm = document.querySelector("#product_form");
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    makeProductFromForm(e, uploadedFiles);
  });
}

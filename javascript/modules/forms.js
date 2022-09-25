import { getLocalUser, imagePreview, userMessage } from "../utils/utils.js";
import { clearForm } from "../utils/validation.js";
import { getJWT, uploadImg, deleteImg } from "./apiCalls.js";
import { product } from "./product.js";

const productColors = ["red", "green", "blue", "gray", "black", "white"];
export const productCategories = [
  "full-suit",
  "shirts",
  "pants",
  "jackets",
  "accessories",
];
const productSizes = ["xl", "l", "m", "s"];

let uploadedFiles = [];

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
  let formHtml = `<form action="#" class="col-12 col-lg-5 d-flex flex-column mb-2" id="product_form">`;
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
  formHtml += `<div class="d-flex flex-column flex-lg-row mb-2">`;
  if (categories) {
    formHtml += makeDropdownHtml("Categories", productCategories, "checkbox");
  }
  if (colors) {
    formHtml += makeDropdownHtml("Colors", productColors, "checkbox");
  }
  if (sizes) {
    formHtml += makeDropdownHtml("Sizes", productSizes, "checkbox");
  }
  formHtml += `</div>`;

  formHtml += `<button type="submit" class="btn btn-primary">Preview</button><div id="message-container"</form>`;

  displayContainer.innerHTML += formHtml;
  imageUploadForm(displayContainer);
  imageUploadSubmit();
  productFormSubmit();
  addDropdownListeners();
}

function imageUploadForm(container) {
  container.innerHTML += `<form id="upload_form" class="col-12 offset-lg-1 col-lg-6">
    <input
      type="file"
      name="files"
      id="images"
      accept="images/jpeg"
      class="drag-n-drop"
      multiple
    />
  <button class="btn bg-primary text-white float-end" id="upload-btn">Upload</button>
  <div id="upload-preview" class=""></div></form>`;
}
function imageUploadSubmit() {
  const imageUploadForm = document.querySelector("#upload_form");
  const uploadPreview = document.querySelector("#upload-preview");
  imageUploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    uploadPreview.innerHTML = `<div class="dots"></div>`;
    const data = new FormData(e.target);
    console.log(data, getLocalUser().jwt);
    uploadImg(data, getLocalUser().jwt).then((imgs) => {
      imgs.forEach((img) => {
        uploadedFiles.push(img);
      });
      uploadPreview.innerHTML = imagePreview(uploadedFiles);
      addRemoveBtns(uploadPreview);
    });
  });
}
function addRemoveBtns(uploadPreview) {
  const removeImgBtn = document.querySelectorAll(".remove-img");
  removeImgBtn.forEach((imgBtn) => {
    imgBtn.addEventListener("click", (e) => {
      uploadedFiles = uploadedFiles.filter((file) => {
        if (file.id == e.path[0].id) {
          return false;
        } else {
          return true;
        }
      });
      deleteImg(e.path[0].id, getLocalUser().jwt);
      console.log(uploadedFiles);
      uploadPreview.innerHTML = imagePreview(uploadedFiles);
      addRemoveBtns(uploadPreview);
    });
  });
}
export function makeDropdownHtml(label, trait, inputType) {
  let newHtml = "";
  newHtml += `<div class="dropdown bg-white my-2 mx-1">
    <div class="dropdown_button bg-white rounded-1 px-3">
      ${label} v
    </div>
    <ul class="dropdown_list" id="${label}">`;
  trait.forEach((item) => {
    newHtml += `<li>
    <input type="${inputType}" id="${item}" name = "${label}"/> <label for="${item}">${item}</label>
  </li>`;
  });
  newHtml += `</ul>
  </div>`;
  return newHtml;
}
function dropdownClose() {
  console.log(this.children[1]);
  this.children[1].classList.remove("active");
  this.removeEventListener("pointerleave", dropdownClose);
}
export function addDropdownListeners() {
  const dropdownButtons = document.querySelectorAll(".dropdown_button");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.nextSibling.nextSibling.classList.toggle("active");

      console.log(button.parentElement.parentElement);
      button.parentElement.parentElement.addEventListener("click", (e) => {
        if (!e.path[0].nodeName == "DIV") {
          dropdownClose();
        }
      });
      /* button.addEventListener("click", dropdownClose); */
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
  const imgIds = [];
  const colors = [];
  const sizes = [];
  const categories = [];
  if (images.length >= 4) {
    images.forEach((img) => {
      imgIds.push(img.id);
    });
  } else {
    userMessage("Atleast 4 images needed");
    return;
  }

  for (let i = 0; i < e.target.length; i++) {
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
  if (!colors.length || !sizes.length || !categories.length) {
    console.log("product needs atleast 1 color 1 size and 1 category");
    return;
  }
  if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
    console.log("product needs a title, price and description");
    return;
  }
  const newProduct = new product(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    colors,
    sizes,
    categories,
    imgIds
  );
  const displayContainer = document.querySelector("#product_container_dialog");

  newProduct.getImageDetails().then(() => {
    newProduct.createProductPage(displayContainer);
    displayContainer.showModal();
    displayContainer.innerHTML += `<button href="#" id="publish-btn">Publish</button><button id="cancel-btn">Cancel</button>`;
    const publishBtn = document.querySelector("#publish-btn");
    const cancelBtn = document.querySelector("#cancel-btn");

    publishBtn.addEventListener("click", (e) => {
      e.preventDefault();
      newProduct.stringifyLists();
      newProduct.publishProduct();
      clearForm();
    });
    cancelBtn.addEventListener("click", (e) => {
      displayContainer.innerHTML = "";
      displayContainer.close();
    });
  });
}
function productFormSubmit() {
  const productForm = document.querySelector("#product_form");
  validateForm(productForm);
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    makeProductFromForm(e, uploadedFiles);
  });
}
function validateForm(form) {
  console.log(form);
}

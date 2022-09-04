const productColors = ["red", "green", "blue", "gray", "black", "white"];
const productCategories = ["full-suite", "shirt", "pants", "jackets"];
const productSizes = ["xl", "l", "m", "s"];

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
  if (categories) {
    formHtml += makeDropdownHtml("Categories", productCategories);
  }
  if (colors) {
    formHtml += makeDropdownHtml("Colors", productColors);
  }
  if (sizes) {
    formHtml += makeDropdownHtml("Sizes", productSizes);
  }
  if (files) {
    formHtml += `<div class="file_container my-2">
    <input
      type="file"
      name="files"
      id="images"
      accept="images/jpeg"
      class="drag-n-drop"
      value="drag and drop images here"
      multiple
    />
  </div>
  <div id="upload-preview"></div>`;
  }
  formHtml += `<button type "submit" class"btn btn-primary">Preview</button></form>`;

  displayContainer.innerHTML += formHtml;
}

export function makeDropdownHtml(label, trait) {
  let container = "";
  container += `<div class="dropdown bg-white">
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

export function addDropdownListeners() {
  const dropdownButtons = document.querySelectorAll(".dropdown_button");
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      button.nextSibling.nextSibling.classList.toggle("active");
    });
    addEventListener("mouseenter", () => {
      button.nextSibling.nextSibling.classList.toggle("active");
    });
  });
}

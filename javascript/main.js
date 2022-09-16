import {
  getProduct,
  getProducts,
  postProduct,
  uploadImg,
} from "./modules/apiCalls.js";
import { loginFormSetup } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import {
  makeForm,
  makeDropdownHtml,
  addDropdownListeners,
  productCategories,
} from "./modules/forms.js";
import { getLocalUser, imagePreview } from "./utils/utils.js";
import {
  productFormContainer,
  body,
  loginForm,
  dropdown,
  productContainer,
  currentUser,
  snapScrollContainer,
  cartBtn,
  categoriesListContainer,
  navBarContainer,
  cartContainer,
  productsOutput,
} from "./utils/constants.js";
import { navBarSetup } from "./modules/nav.js";

if (cartBtn) {
  if (cartContainer) {
    cartBtn.addEventListener("click", () => {
      cartContainer.classList.toggle("open");
    });
  }
}
console.log(snapScrollContainer);
if (snapScrollContainer) {
  snapScrollContainer.addEventListener("scroll", (e) => {
    if (snapScrollContainer.scrollTop >= window.innerHeight) {
      snapScrollContainer.style.scrollSnapType = "none";
    } else {
      snapScrollContainer.style.scrollSnapType = "y mandatory";
    }
  });
}
if (categoriesListContainer) {
  makeCategoriesListElement(productCategories, categoriesListContainer);
}
export function makeCategoriesListElement(list, container) {
  list.forEach((category) => {
    container.innerHTML += `<a href="products.html" class="col">
    <li class="rounded-3 text-white" id="${category}-category-img">
      <h3>${category}</h3>
    </li></a
  >`;
  });
}
if (loginForm) {
  loginFormSetup(loginForm);
}

window.addEventListener("resize", navBarSetup);
navBarSetup();
let currentProduct = {};
const currentProducts = [];
if (productFormContainer) {
  makeForm(productFormContainer);
}

/* if (productContainer) {
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
} */

function makeProducts(list, container) {
  list.forEach((item) => {
    currentProducts.push(
      new product(
        item.title,
        item.price,
        item.description,
        item.color,
        item.size,
        item.specs,
        item.image_url,
        item.id
      )
    );
  });
  currentProducts.forEach((item) => {
    item.parseLists();
    item.getImageDetails().then(() => {
      console.log(item);
      item.makeProductCard(container);
    });
  });
}
if (productsOutput) {
  getProducts("").then((list) => {
    makeProducts(list, productsOutput);
  });
}

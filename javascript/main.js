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
import {
  addToShoppingCart,
  getLocalUser,
  imagePreview,
  removeFromShoppingCart,
} from "./utils/utils.js";
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
const shoppingCartContainer = document.querySelector(
  "#added-products-container"
);
const totalCostShoppingCart = document.querySelector("#cost-of-all-items");
let currentCategory = "";
let currentProducts = [];

const secNavCategoryBtns = document.querySelectorAll(".category-btn_sec-nav");

function secNavSetup() {
  secNavCategoryBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.id == currentCategory) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      secNavCategoryBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.toggle("active");
      currentCategory = e.target.id;
      displayProducts();
    });
  });
}

if (location.pathname == "/product-page.html") {
  console.log("loading product...");
  let currentProduct = {};
  const params = new URLSearchParams(location.search);
  const productId = params.get("id");
  getProduct(productId).then((productObject) => {
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
    });
  });
}

if (cartBtn) {
  if (cartContainer) {
    cartBtn.addEventListener("click", () => {
      cartContainer.classList.toggle("open");
    });
  }
}
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
function makeCategoriesListElement(list, container) {
  list.forEach((category) => {
    container.innerHTML += `<a href="products.html?category=${category}" class="col">
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

if (productFormContainer) {
  makeForm(productFormContainer);
}

async function makeProducts(list, container) {
  let newHtml = "";
  list.forEach((item) => {
    const newProduct = new product(
      item.title,
      item.price,
      item.description,
      item.color,
      item.size,
      item.specs,
      item.image_url,
      item.id
    );
    if (
      currentProducts.findIndex((product) => {
        return product.id == newProduct.id;
      }) == -1
    ) {
      newProduct.parseLists();
      currentProducts.push(newProduct);
    }
  });
  if (currentCategory == "") {
    for (let i = 0; i < currentProducts.length; i++) {
      if (currentProducts[i].images.length == 0) {
        await currentProducts[i].getImageDetails().then(() => {
          newHtml += currentProducts[i].makeProductCard();
        });
      } else {
        newHtml += currentProducts[i].makeProductCard();
      }
      if (i == currentProducts.length - 1) {
        container.innerHTML = newHtml;
        addCardEventListers();
      }
    }
  } else {
    for (let i = 0; i < currentProducts.length; i++) {
      if (currentProducts[i].specs == currentCategory) {
        if (currentProducts[i].images.length == 0) {
          await currentProducts[i].getImageDetails().then(() => {
            newHtml += currentProducts[i].makeProductCard();
          });
        } else {
          newHtml += currentProducts[i].makeProductCard();
        }
      }

      if (i == currentProducts.length - 1) {
        container.innerHTML = newHtml;
        addCardEventListers();
      }
    }
  }
}
if (productsOutput) {
  if (location.search) {
    const newParams = new URLSearchParams(location.search);
    if (newParams.get("category")) {
      currentCategory = newParams.get("category");
    }
  }
  displayProducts();
  secNavSetup();
}
function displayProducts() {
  productsOutput.innerHTML = `<div class="loading"></div>`;
  if (currentCategory) {
    getProducts(`specs=${currentCategory}`).then((list) => {
      makeProducts(list, productsOutput);
    });
  } else {
    getProducts(``).then((list) => {
      makeProducts(list, productsOutput);
    });
  }
}
function HandleProductOutput(product) {
  return product.specs == currentCategory;
}

function addCardEventListers() {
  const cardImgs = document.querySelectorAll(".card img");
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  console.log(addToCartBtns);
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e);
      e.preventDefault();
      if (!localStorage.getItem("shoppingcart")) {
        localStorage.setItem("shoppingcart", "");
      }

      addToShoppingCart(
        currentProducts.filter((product) => {
          return product.id == e.srcElement.id;
        })
      );
      updateShoppingcart();
    });
  });

  cardImgs.forEach((card) => {
    card.addEventListener("click", () => {
      currentProducts
        .filter((product) => {
          return product.id == card.id;
        })[0]
        .fullImageModal(0);
    });
  });
  updateShoppingcart();
}

function updateShoppingcart() {
  shoppingCartContainer.innerHTML = "";
  const shoppingCartList = JSON.parse(localStorage.getItem("shoppingcart"));
  console.log(shoppingCartList);
  let newHtml = ``;
  let totalPrice = 0;
  for (let i = 0; i < shoppingCartList.length; i++) {
    console.log(i);
    console.log("before", shoppingCartList[i][0]);
    shoppingCartContainer.innerHTML += `<li class="d-flex justify-content-between my-2">
<a href="/product-page.html?id=${shoppingCartList[i][0].id}" class="d-flex me-5"
  ><div class="circle overflow-hidden me-3">
    <img
      src="${shoppingCartList[i][0].images[0].formats.thumbnail.url}"
      alt=""
      class="w-100"
    />
  </div>
  <h5 class="my-auto fs-5">${shoppingCartList[i][0].title}</h5></a
>
<p class="my-auto me-2">${shoppingCartList[i][0].price}</p>
<button class="btn remove-from-cart-btn" id="${i}">X</button>
</li>`;
    totalPrice = totalPrice + shoppingCartList[i][0].price;
  }
  totalCostShoppingCart.innerHTML = `Tot: ${totalPrice} Nok`;
  const removeBtns = document.querySelectorAll(".remove-from-cart-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.id);
      removeFromShoppingCart(e.target.id);
      updateShoppingcart();
    });
  });
}

/* if (shoppingCartContainer) {
  updateShoppingcart();
} */

import {
  getProduct,
  getProducts,
  getHero,
  supaBaseTest,
} from "./modules/apiCalls.js";
import { loginFormSetup, redirect } from "./modules/login.js";
import { product } from "./modules/product.js";
import { user } from "./modules/user.js";
import { makeForm, productCategories } from "./modules/forms.js";
import {
  addToShoppingCart,
  getLocalUser,
  removeFromShoppingCart,
} from "./utils/utils.js";
import {
  productFormContainer,
  loginForm,
  productContainer,
  snapScrollContainer,
  cartBtn,
  categoriesListContainer,
  cartContainer,
  productsOutput,
  main,
  header,
} from "./utils/constants.js";
import { navBarSetup } from "./modules/nav.js";
const shoppingCartContainer = document.querySelector(
  "#added-products-container"
);
import { makeDots, dotsTimer } from "./modules/loading.js";
const getIdInput = document.querySelector("#get-product-id_input");
const getIdBtn = document.querySelector("#get-product_btn");
const totalCostShoppingCart = document.querySelector("#cost-of-all-items");
const closeShoppingcartBtn = document.querySelector("#cancel-cart");
const mainBanner = document.querySelector("#main-banner");
const searchInput = document.querySelector("#search-input");
const searchDropdown = document.querySelector("#search-dropdown");
let currentCategory = "all";
let currentProducts = [];
let productsToLoad = 10;
const secNavCategoryBtns = document.querySelectorAll(".category-btn_sec-nav");
window.addEventListener("resize", navBarSetup);
navBarSetup();
updateShoppingcart();
supaBaseTest();
if (location.pathname == "/add-products.html") {
  if (getLocalUser()) {
    if (productFormContainer) {
      makeForm(productFormContainer);
      getIdBtn.addEventListener("click", () => {
        const id = parseInt(getIdInput.value);
        if (id) {
          getProduct(id).then((product) => {
            const form = document.querySelector("#product_form");
            form.children[1].value = product.title;
            console.log(product);
          });
        } else {
          console.log("not a number");
        }
      });
    }
  } else {
    redirect("admin.html");
  }
}
if (location.pathname == "/products.html") {
  main.addEventListener("scroll", (e) => {
    if (main.scrollTop > main.scrollHeight - main.clientHeight - 1) {
      main.scrollTo(0, main.scrollHeight - main.clientHeight - 2);
      if (productsToLoad < currentProducts.length) {
        productsToLoad = productsToLoad + 10;
        makeProducts();
      }
    }
  });
  if (productsOutput) {
    if (location.search) {
      const newParams = new URLSearchParams(location.search);
      if (newParams.get("category")) {
        currentCategory = newParams.get("category");
      }
    }
    makeProducts();
    secNavSetup();
  }
}
if (location.pathname == "/index.html" || location.pathname == "/") {
  setupHeroImg();
  makeProducts();
}

if (main) {
  main.style.height = `calc(100vh - ${header.clientHeight}px)`;
}

if (location.pathname == "/product-page.html") {
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
      const productImgs = document.querySelectorAll("#product_container img");
      productImgs.forEach((card) => {
        card.addEventListener("click", (e) => {
          currentProduct.fullImageModal(e.target.id);
        });
      });
    });
  });
}

if (cartBtn) {
  if (cartContainer) {
    cartBtn.addEventListener("click", toggleCart);
    closeShoppingcartBtn.addEventListener("click", closeCart);
  }
}
if (snapScrollContainer) {
  snapScrollContainer.addEventListener("scroll", (e) => {
    if (snapScrollContainer.scrollTop >= main.clientHeight + 20) {
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

async function displayProducts() {
  productsOutput.innerHTML += `<div class="dot_container"></div>`;
  makeDots();
  dotsTimer();
  let newHtml = "";

  if (currentCategory == "all") {
    for (let i = productsToLoad - 10; i < productsToLoad; i++) {
      if (!currentProducts[i]) {
        removeDotContainers();
        productsOutput.innerHTML += newHtml;
        addCardEventListers();
        return;
      }
      if (currentProducts[i].images.length == 0) {
        await currentProducts[i].getImageDetails().then(() => {
          for (let j = 0; j < currentProducts[i].images.length; j++)
            if (!currentProducts[i].images[j].formats) {
              currentProducts[i].images[j].formats = {
                large: { url: "/img/logo-stock-img.png" },
                medium: { url: "/img/logo-stock-img.png" },
                small: { url: "/img/logo-stock-img.png" },
                thumbnail: { url: "/img/logo-stock-img.png" },
              };
            }
          newHtml += currentProducts[i].makeProductCard();
        });
      } else {
        newHtml += currentProducts[i].makeProductCard();
      }
      if (i == productsToLoad - 1) {
        removeDotContainers();
        productsOutput.innerHTML += newHtml;
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
        removeDotContainers();
        productsOutput.innerHTML = newHtml;
        addCardEventListers();
      }
    }
  }
}
function secNavSetup() {
  secNavCategoryBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.id == currentCategory) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      productsToLoad = 10;
      secNavCategoryBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.toggle("active");
      currentCategory = e.target.id;
      productsOutput.innerHTML = `<div class="dot_container"></div>`;
      makeProducts(currentProducts, productsOutput);
    });
  });
  searchInput.addEventListener("input", searchProducts);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      filterProducts(e.target.value);
    }
  });
}
async function setupHeroImg() {
  await getHero().then((heroImg) => {
    mainBanner.style.backgroundImage = `url(${heroImg.hero_banner.formats.large.url})`;
  });
}

function filterProducts(value) {
  searchInput.value = "";
  productsOutput.innerHTML = "";
  currentProducts.forEach((product) => {
    const regEx = new RegExp(`(${value})`, `gi`);

    if (regEx.test(product.title)) {
      productsOutput.innerHTML += product.makeProductCard();
    }
  });
}
function searchProducts(e) {
  e.preventDefault();
  searchDropdown.innerHTML = "";
  const regEx = new RegExp(`(${e.target.value})`, `gi`);
  if (!e.target.value == "") {
    currentProducts.forEach((product) => {
      if (regEx.test(product.title)) {
        searchDropdown.innerHTML += `<p>${product.title}</p>`;
        for (let i = 0; i < searchDropdown.children.length; i++) {
          searchDropdown.children[i].addEventListener("click", (e) => {
            searchInput.value = e.target.outerText;
            searchDropdown.innerHTML = "";
            filterProducts(searchInput.value);
          });
        }
      }
    });
  }
}
function addCardEventListers() {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cartBtn.style.backgroundColor = `#033324`;
      btn.style.backgroundColor = `#033324`;
      setTimeout(() => {
        cartBtn.style.backgroundColor = `#fff`;
        btn.style.backgroundColor = `#fff`;
      }, 150);

      if (!localStorage.getItem("shoppingcart")) {
        localStorage.setItem("shoppingcart", "");
      }

      addToShoppingCart(
        currentProducts.filter((product) => {
          return product.id == btn.id;
        })
      );
      updateShoppingcart();
    });
  });
}

function updateShoppingcart() {
  shoppingCartContainer.innerHTML = "";
  const shoppingCartList = JSON.parse(localStorage.getItem("shoppingcart"));
  let newHtml = ``;
  let totalPrice = 0;

  if (shoppingCartList && shoppingCartList.length > 0) {
    for (let i = 0; i < shoppingCartList.length; i++) {
      shoppingCartContainer.innerHTML += `<li class="d-flex justify-content-between my-2">
  <a href="/product-page.html?id=${shoppingCartList[i].id}" class="d-flex me-5"
    ><div class="circle overflow-hidden me-3">
      <img
        src="${shoppingCartList[i].images[0].formats.thumbnail.url}"
        alt=""
        class="w-100"
      />
    </div>
    <h5 class="my-auto fs-5">${shoppingCartList[i].title}</h5></a
  >
  <p class="my-auto me-2">${shoppingCartList[i].price}</p>
  <button class="btn remove-from-cart-btn" id="${i}">X</button>
  </li>`;
      totalPrice = totalPrice + shoppingCartList[i].price;
    }
    totalCostShoppingCart.innerHTML = `Tot: ${totalPrice} Nok`;
    const removeBtns = document.querySelectorAll(".remove-from-cart-btn");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        removeFromShoppingCart(e.path[1].id);
        updateShoppingcart();
      });
    });
  } else {
    totalPrice = 0;
    totalCostShoppingCart.innerHTML = `Tot: ${totalPrice} Nok`;
  }
}
async function makeProducts() {
  let params = "";
  if (location.pathname == "/index.html" || location.pathname == "/") {
    params = "featured=true";
  }
  getProducts(params).then((list) => {
    list.forEach((item) => {
      const newProduct = new product(
        item.title,
        item.price,
        item.description,
        item.color,
        item.size,
        item.specs,
        item.image_url,
        item.featured,
        item.id
      );
      if (
        currentProducts.findIndex((product) => {
          return product.title == newProduct.title;
        }) == -1
      ) {
        newProduct.parseLists();
        currentProducts.push(newProduct);
      }
    });
    displayProducts();
  });
}
function removeDotContainers() {
  const dotContainers = document.querySelectorAll(".dot_container");
  dotContainers.forEach((dotContainer) => {
    dotContainer.remove();
  });
}
function toggleCart() {
  cartContainer.classList.toggle("open");
  main.addEventListener("click", closeCart);
}
function closeCart() {
  cartContainer.classList.remove("open");
}

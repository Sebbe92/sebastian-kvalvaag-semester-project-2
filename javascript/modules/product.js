import { body } from "../utils/constants.js";
import { GetImgById, postProduct } from "./apiCalls.js";
import { makeDropdownHtml } from "./forms.js";

export class product {
  constructor(
    title,
    price,
    description,
    colors,
    sizes,
    specs,
    imageIds,
    id = "",
    images = []
  ) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.color = colors),
      (this.size = sizes),
      (this.specs = specs),
      (this.image_url = imageIds);
    this.id = id;
    this.images = images;
  }

  async getImageDetails() {
    if (this.image_url) {
      for (let i = 0; i < this.image_url.length; i++) {
        this.images.push(await GetImgById(this.image_url[i]));
      }
    }
  }
  createColorsHtml() {
    let colorsHtml = "";
    this.color.forEach((color) => {
      colorsHtml += `<div class="circle bg-prod-${color}"></div>`;
    });
    return colorsHtml;
  }
  createProductPage(location) {
    let categoriesHtml = "";
    const colorsHtml = this.createColorsHtml();
    let sizesHtml = "";

    sizesHtml = makeDropdownHtml("Size", this.size, "radio");
    console.log(sizesHtml);
    this.specs.forEach((category) => {
      categoriesHtml += `<li>${category}</li>`;
    });
    const html = `<section class="row mt-3 bg-white mx-auto justify-content-around">
    <div class=" col-12 col-md-8 row mx-auto max-500">
      <div class="col-12 col-sm-9 big-img">
        <img
          src="${this.images[0].formats.medium.url}"
          alt="${this.description}"
          class="my-auto"
        />
      </div>
      <div class="col-12 col-sm-3 d-flex flex-row flex-sm-column  container row row-cols-3 mx-auto justify-content-around px-3 p-sm-0">
      <img
      src="${this.images[1].formats.small.url}"
      alt="${this.description}"
      class="small-img"
      />
      <img
      src="${this.images[2].formats.small.url}"
      alt="${this.description}"
      class="small-img"
      />
      <img
      src="${this.images[3].formats.small.url}"
      alt="${this.description}"
      class="small-img"
      />

      </div>
    </div>
    <div class="col-12 col-md-5  d-flex flex-column">
      <h1>${this.title}</h1>
      <div>
        <p>${this.description}</p>
      </div>
      <ul>
      ${categoriesHtml}
      </ul>
      <div class="d-flex gap-2">
        ${colorsHtml}
      </div>
      ${sizesHtml}
      <button class="mt-auto buy-now-btn">Buy Now</button>
    </div>
  </section>
  `;
    location.innerHTML = html;
  }
  makeProductCard(container) {
    let colorsHtml = "";
    if (this.color) {
      colorsHtml = this.createColorsHtml();
    }

    let imageUrl = "#";
    if (this.images[0]) {
      imageUrl = this.images[0].formats.small.url;
    }
    const newHtml = `<div class="card col mt-3" id="card-${this.id}" >
    <div class="square-img-frame">
    <img
    src="${imageUrl}"
    alt="${this.description}"
    id="${this.id}"
    
  /></div>
      <div class="card-body p-1 pt-2 position-relative" style={z-index:"-1"}>
      <a href="product-page.html?id=${this.id}" class="bg-primary">
        <h5 class="card-title w-75">${this.title}</h5>
        <p
          class="card-text m-0 mt-auto position-absolute top-0 end-0 pt-1"
        >
          ${this.price} Nok
        </p>
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-2">
            ${colorsHtml}
          </div>
          <button href="#" class="btn btn-success fs-6 add-to-cart-btn" id="${this.id}" >Add To Cart</button>
        </div>
      </div>
      </a>
  </div>`;
    return newHtml;
  }
  makeShoppingCartLi() {
    return `<li class="d-flex justify-content-between my-2">
    <a href="/product-page.html?id=${this.id}" class="d-flex me-5"
      ><div class="circle overflow-hidden me-3">
        <img
          src="${this.images}"
          alt="${this.description}"
        />
      </div>
      <h5 class="my-auto fs-5">${this.title}</h5></a
    >
    <p class="my-auto me-2">${this.price} Nok</p>
    <button class="btn remove-from-cart-btn">Remove</button>
  </li>`;
  }
  publishProduct() {
    const jwt = JSON.parse(localStorage.getItem("user")).jwt;
    postProduct(this, jwt);
  }
  parseLists() {
    if (this.color) {
      this.color = this.color.split(",");
    }
    if (this.size) {
      this.size = this.size.split(",");
    }
    if (this.specs) {
      this.specs = this.specs.split(",");
    }
    if (this.image_url) {
      this.image_url = this.image_url.split(",");
    }
  }
  stringifyLists() {
    this.color = this.color.join(",");
    this.size = this.size.join(",");
    this.specs = this.specs.join(",");
    this.image_url = this.image_url.join(",");
  }
  fullImageModal(imageindex) {
    let currentImageIndex = imageindex;
    const modal = document.querySelector("#full-img-modal");
    modal.innerHTML = "";
    modal.innerHTML += `
      <img
      src="${this.images[currentImageIndex].formats.large.url}"
      alt="${this.description}"
    />
    <div class="close-btn position-absolute top-0 end-0 text-danger" id="close-img-modal"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11.4289" y="7.89339" width="25" height="5" transform="rotate(45 11.4289 7.89339)" fill="#8E0000"/>
    <rect x="29.1066" y="11.4289" width="25" height="5" transform="rotate(135 29.1066 11.4289)" fill="#8E0000"/>
    </svg>
    </div><div class="postion-absolute bottom-0 d-flex justify-content-center mt-2">
    <button id="previus-img-button" class="btn">previus</button>
    <button id="next-img-button" class="btn">next</button>
    </div>
      `;
    if (!modal.open) {
      modal.showModal();
    }

    console.log(currentImageIndex);

    const closeImageModalBtn = document.querySelector("#close-img-modal");
    const nextBtn = document.querySelector("#next-img-button");
    const prevBtn = document.querySelector("#previus-img-button");
    prevBtn.addEventListener("click", () => {
      currentImageIndex = currentImageIndex - 1;
      if (currentImageIndex < 0) {
        currentImageIndex = this.images.length - 1;
      }
      this.fullImageModal(currentImageIndex);
    });
    nextBtn.addEventListener("click", () => {
      currentImageIndex++;
      if (currentImageIndex >= this.images.length) {
        console.log("bigger");
        currentImageIndex = 0;
      }
      this.fullImageModal(currentImageIndex);
    });
    closeImageModalBtn.addEventListener("click", () => {
      modal.close();
    });
  }
}

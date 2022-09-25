import { body, head } from "../utils/constants.js";
import { getLocalUser } from "../utils/utils.js";
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
    featured = false,
    id = ""
  ) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.color = colors),
      (this.size = sizes),
      (this.specs = specs),
      (this.image_url = imageIds),
      (this.id = id),
      (this.images = []),
      (this.featured = featured);
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
    const imagesurl = [];
    head.innerHTML += `<meta
    name="description"
    content="${this.description}"
  />`;
    for (var i = 0; i < this.images.length; i++) {
      if (!this.images[i].formats) {
        imagesurl.push(`/img/logo-stock-img.png`);
      } else {
        imagesurl.push(this.images[i].formats.medium.url);
      }
    }
    sizesHtml = makeDropdownHtml("Size", this.size, "radio");
    this.specs.forEach((category) => {
      categoriesHtml += `<li>${category}</li>`;
    });
    const htmlHead = document.querySelector("head");
    htmlHead.innerHTML += `<title>ISU | ${this.title}</title><meta name="description" content="${this.description}"`;

    const html = `<section class="row mt-5 bg-white mx-auto justify-content-around">
    <div class=" col-12 col-md-8 row mx-auto max-500">
      <div class="col-12 col-sm-9 big-img">
        <img
          src="${imagesurl[0]}"
          alt="${this.description}"
          class="my-auto"
          id="0"
        />
      </div>
      <div class="col-12 col-sm-3 d-flex flex-row flex-sm-column  container row row-cols-3 mx-auto justify-content-around px-3 p-sm-0 max-h-373">
      <img
      src="${imagesurl[1]}"
      alt="${this.description}"
      class="small-img"
      id="1"
      />
      <img
      src="${imagesurl[2]}"
      alt="${this.description}"
      class="small-img"
      id="2"
      />
      <img
      src="${imagesurl[3]}"
      alt="${this.description}"
      class="small-img"
      id="3"
      />

      </div>
    </div>
    <div class="col-12 col-md-6 mx-auto d-flex flex-column ">
      <h1 class="w-75">${this.title}</h1>
      <div class="w-50">
        <p>${this.description}</p>
      </div>
      <ul>
      ${categoriesHtml}
      </ul>
      <div class="d-flex gap-2">
        ${colorsHtml}
      </div>
      <div class="d-flex">
      ${sizesHtml}
      <button class="btn btn-primary mt-auto buy-now-btn w-25 m-0 ms-auto me-5">Buy Now</button>
    </div>
    </div>
  </section>
  `;
    location.innerHTML = html;
  }
  makeProductCard() {
    let colorsHtml = "";
    if (this.color) {
      colorsHtml = this.createColorsHtml();
    }
    let col = "col";
    let imageUrl = "";
    if (this.images[0].formats) {
      imageUrl = this.images[0].formats.small.url;
    } else {
      imageUrl = `/img/logo-stock-img.png`;
    }
    if (location.pathname == "/index.html" || location.pathname == "/") {
      col = "";
    }
    const newHtml = `<div class="shadow card ${col} mt-3" id="card-${this.id}" >
    <a href="product-page.html?id=${this.id}" class="">
    <div class="square-img-frame ">
    <img
    src="${imageUrl}"
    alt="${this.description}"
    id="${this.id}"
    
  /></div>
      <div class="card-body p-1 pt-2 position-relative" style={z-index:"-1"}>
      
        <h5 class="card-title w-75 m-0">${this.title}</h5>
        <p
          class="card-text m-0 mt-auto position-absolute card-body_price p-1 shadow"
        >
          ${this.price} Nok
        </p>
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            ${colorsHtml}
          </div></a>
          <button href="#" class="btn btn-white p-0 add-to-cart-btn" id="${this.id}" ><svg xmlns="http://www.w3.org/2000/svg"  height="48" width="48"><path fill="#002632" d="M22.5 34h3v-8.5H34v-3h-8.5V14h-3v8.5H14v3h8.5ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/></svg></button>
        </div>
      </div>
      
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
    postProduct(this, getLocalUser().jwt);
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
        currentImageIndex = 0;
      }
      this.fullImageModal(currentImageIndex);
    });
    closeImageModalBtn.addEventListener("click", () => {
      modal.close();
    });
  }
}

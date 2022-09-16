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
    id = ""
  ) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.color = colors),
      (this.size = sizes),
      (this.specs = specs),
      (this.image_url = imageIds);
    this.id = id;
    this.images = [];
  }
  async getImageDetails() {
    if (this.image_url) {
      for (let i = 0; i < this.image_url.length; i++) {
        this.images.push(await GetImgById(this.image_url[i]));
      }
    }
  }
  createColorsHtml() {
    console.log(this);
    let colorsHtml = "";
    this.color.forEach((color) => {
      colorsHtml += `<div class="circle bg-${color}"></div>`;
    });
    console.log(colorsHtml);
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
    const html = `<section class="row mt-3 bg-white">
    <div class="col-md-7 col-sm-12  row">
      <div class="col-9 big-img">
        <img
          src="${this.images[0].formats.thumbnail.url}"
          alt="${this.description}"
        />
      </div>
      <div class="col-3 d-flex flex-column justify-content-between">
        <div class="small-img ">
          <img
          src="${this.images[1].formats.thumbnail.url}"
          alt="${this.description}"
          />
        </div>
        <div class="small-img ">
          <img
          src="${this.images[2].formats.thumbnail.url}"
          alt="${this.description}"
          />
        </div>
        <div class="small-img">
          <img
          src="${this.images[3].formats.thumbnail.url}"
          alt="${this.description}"
          />
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-12 d-flex flex-column">
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
      imageUrl = this.images[0].formats.thumbnail.url;
    }
    container.innerHTML += `<div class="card col mt-3">
    <a href="product-page.html?id=${this.id}" class="product-link">
    <img
    src="${imageUrl}"
    alt="${this.description}"
    class="w-100"
  />
      <div class="card-body p-1 pt-2 position-relative" style={z-index:"-1"}>
        <h5 class="card-title w-75">${this.title}</h5>
        <p
          class="card-text m-0 mt-auto position-absolute top-0 end-0 pt-1"
        >
          ${this.price} Nok
        </p></a>
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-2">
            ${colorsHtml}
          </div>
          <a href="#" class="btn btn-success fs-6 add-to-cart-btn" id="${this.id}" >Add To Cart</a>
        </div>
      </div>
    
  </div>`;
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
}

import { GetImgById, postProduct } from "./apiCalls.js";
import { makeDropdownHtml } from "./forms.js";

export class product {
  constructor(title, price, description, colors, sizes, specs, imageIds) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.color = colors),
      (this.size = sizes),
      (this.specs = specs),
      (this.image_url = imageIds);
    this.images = [];
  }
  async getImageDetails() {
    for (let i = 0; i < this.image_url.length; i++) {
      this.images.push(await GetImgById(this.image_url[i]));
    }
  }
  createProductPage(location) {
    let categoriesHtml = "";
    let colorsHtml = "";
    let sizesHtml = "";
    this.color.forEach((color) => {
      colorsHtml += `<div class="circle bg-${color}"></div>`;
    });

    sizesHtml = makeDropdownHtml("Size", this.size, "radio");
    console.log(sizesHtml);
    this.specs.forEach((category) => {
      categoriesHtml += `<li>${category}</li>`;
    });
    const html = `<section class="row mt-3 bg-white">
    <div class="col-md-7 col-sm-12  row">
      <div class="col-9 big-img">
        <img
          src="${this.images[0].formats.large.url}"
          alt="${this.description}"
        />
      </div>
      <div class="col-3 d-flex flex-column justify-content-between">
        <div class="small-img ">
          <img
          src="${this.images[1].formats.large.url}"
          alt="${this.description}"
          />
        </div>
        <div class="small-img ">
          <img
          src="${this.images[1].formats.large.url}"
          alt="${this.description}"
          />
        </div>
        <div class="small-img">
          <img
          src="${this.images[1].formats.large.url}"
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
  makeProductCard() {
    return `<div class="card m-auto mt-5" style="width: 72%">
    <img src="..." class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <p class="card-text">
        ${this.description}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
  }
  publishProduct() {
    const jwt = JSON.parse(localStorage.getItem("user")).jwt;
    postProduct(this, jwt);
  }
  parseLists() {
    this.color = this.color.split(",");
    this.size = this.size.split(",");
    this.specs = this.specs.split(",");
    this.image_url = this.image_url.split(",");
  }
  stringifyLists() {
    this.color = this.color.join(",");
    this.size = this.size.join(",");
    this.specs = this.specs.join(",");
    this.image_url = this.image_url.join(",");
  }
}

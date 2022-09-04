import { postProduct } from "./apiCalls.js";

export class product {
  constructor(title, price, description, image_url) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.image_url = image_url);
  }
  createProductPage(location) {
    let colorsHtml = "";
    /*  this.colors.forEach((color) => {
      colorsHtml += `<div class="circle bg-${color}"></div>`;
    }); */

    const html = `<section class="row mt-3 bg-white">
    <div class="col-5 offset-2 row">
      <div class="col-9 big-img">
        <img
          src="${this.images[0].large.url}"
          alt="${this.images[0].alt}"
        />
      </div>
      <div class="col-3 d-flex flex-column bg-danger justify-content-around">
        <div class="small-img row-cols-4">
          <img
            src="${this.img[1].src}"
            alt="${this.img[1].alt}"
          />
        </div>
        <div class="small-img row-cols-4">
          <img
            src="${this.img[2].src}"
            alt="${this.img[2].alt}"
          />
        </div>
        <div class="small-img row-cols-4">
          <img
            src="${this.img[3].src}"
            alt="${this.img[3].alt}"
          />
        </div>
      </div>
    </div>
    <div class="col-3 d-flex flex-column">
      <h1>${this.title}</h1>
      <div>
        <h4>Product info:</h4>
        <p>${this.description}</p>
      </div>
      <div class="d-flex gap-2">
        
        ${colorsHtml}
      </div>
      <div class="dropdown">hdfh</div>
      <div><p class="category-tag">Outfit</p></div>
      <button class="mt-auto">Buy Now</button>
    </div>
  </section>
  <section class="bg-white contanier-fluid">asdasd</section>
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
  createProduct(jwt) {
    postProduct(this, jwt);
  }
  concatDescription() {
    if (typeof this.description == "string") {
      console.log("already a string");
      return;
    } else {
      let string = "";

      this.description.forEach((list) => {
        if (typeof list == []) {
          string += list.join(",");
        } else {
          string += list;
        }
        string += ":";
      });
      this.description = string;
    }
  }
  parseDescription() {
    if (typeof this.description == "string") {
      const descriptionList = this.description.split(":");
      let descriptionMatrix = [];
      descriptionList.forEach((item) => {
        const list = item.split(",");

        descriptionMatrix.push(list);
      });
      this.description = descriptionMatrix;
    } else {
      console.log("error");
      return;
    }
  }
  makeDescriptionObject() {
    const color = this.description[0];
    const size = this.description[1];
    const category = this.description[2];
    const longDescription = this.description[3];
    this.description = {
      colors: color,
      sizes: size,
      categories: category,
      longDescription: longDescription,
    };
  }
  makeDescriptionString() {
    let newDescription = "";
    const color = this.description.colors;
    const size = this.description.sizes;
    const shortDescription = this.description.shortDescription;
    const longDescription = this.description.longDescription;
    color.forEach((color) => {
      newDescription += color + ",";
    });
    newDescription += ":";
    size.forEach((size) => {
      newDescription += size + ",";
    });
    newDescription += ":" + shortDescription + ":" + longDescription;
    this.description = newDescription;
  }
  makeImagesString() {
    console.log(this.image_url);
  }
}

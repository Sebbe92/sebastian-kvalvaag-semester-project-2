import { postProduct } from "./apiCalls.js";

export class product {
  constructor(title, price, description) {
    (this.title = title),
      (this.price = price),
      (this.description = description); /* {
        shortDescription,
        spesifications,
        sizes,
        colors,
        images,
      }) */
  }
  createProductPage(location) {
    let colorsHtml = "";
    this.colors.forEach((color) => {
      console.log(color);
      colorsHtml += `<div class="circle bg-${color}"></div>`;
    });

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
    console.log(this);
    postProduct(this, jwt);
  }
  concatDescription() {
    if (typeof this.description == "string") {
      console.log("already a string");
      return;
    } else {
      let string = "";
      console.log(this.description);
      this.description.forEach((list) => {
        string += list.join(",") + ":";
      });
      this.description = string;
      console.log(this.description);
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
      console.log(this.description);
    } else {
      console.log("error");
      return;
    }
  }
}

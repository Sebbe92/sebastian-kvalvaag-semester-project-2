class product {
  constructor(title, price, description, categories, colors, sizes, images) {
    (this.title = title),
      (this.price = price),
      (this.description = description),
      (this.categories = categories),
      (this.colors = colors),
      (this.sizes = sizes),
      (this.images = images);
  }
  makeProductPage() {}
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
}

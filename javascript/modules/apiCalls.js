const productURL = "https://it-suites-you.herokuapp.com/products";
const uploadURL = "https://it-suites-you.herokuapp.com/upload";
const filesURL = "https://it-suites-you.herokuapp.com/upload/files";
const heroURL = "https://it-suites-you.herokuapp.com/home";
export async function getJWT(apiUrl, userName, password) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: `${userName}`,
        password: `${password}`,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.jwt;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${productURL}/${id}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function getProducts(params) {
  try {
    const response = await fetch(`${productURL}?${params}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function getHero() {
  try {
    const response = await fetch(`${heroURL}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postProduct(product, jwt) {
  try {
    const response = await fetch(productURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function uploadImg(formData, jwt) {
  try {
    const result = await fetch(uploadURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    });
    const response = await result.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function GetImgById(id) {
  try {
    const response = await fetch(filesURL + `/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteImg(id, jwt) {
  try {
    const response = await fetch(filesURL + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

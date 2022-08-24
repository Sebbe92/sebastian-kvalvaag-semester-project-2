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

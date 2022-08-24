export function validateLength(string, minLen) {
  if (string.length > minLen) {
    return true;
  } else {
    return false;
  }
}
export function clearForm(form) {
  for (let i = 0; i < form.path[0].length; i++) {
    form.path[0][i].value = "";
  }
}

export function validatePassword() {}

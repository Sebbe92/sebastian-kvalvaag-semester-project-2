let filesToUpload = [];
export function imagePreview(e, container) {
  container.innerHTML = "";
  for (let i = 0; i < e.target.files.length; i++) {
    filesToUpload.push(e.target.files[i]);
  }
  filesToUpload.forEach((file) => {
    const previewObject = URL.createObjectURL(file);
    container.innerHTML += `<img src="${previewObject}"class="preview_img">`;
  });
  return filesToUpload;
}

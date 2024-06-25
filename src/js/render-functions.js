export function renderGallery(images, append = false) {
  const gallery = document.getElementById('gallery');
  const markup = images
    .map(
      image => `
        <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
        </a>
    `
    )
    .join('');
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}

export function clearGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
}

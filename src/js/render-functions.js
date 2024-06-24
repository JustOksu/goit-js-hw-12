export const renderGallery = images => {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      image => `
    <div class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
      </a>
    </div>
  `
    )
    .join('');
  gallery.innerHTML += markup;
};

export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

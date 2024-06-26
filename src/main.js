import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let query = '';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const gallery = document.getElementById('gallery');
let lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  if (query === '') return;

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found. Please try another search term.',
      });
      return;
    }
    renderGallery(data.hits);
    lightbox.refresh();
    if (data.hits.length === 15) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits, true);
    lightbox.refresh();
    if (data.hits.length < 15) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      scrollSmoothly();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

function scrollSmoothly() {
  const gallery = document.getElementById('gallery');
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

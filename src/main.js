import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let query = '';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (query === '') return;

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('is-hidden');
  const data = await fetchImages(query, page);
  renderGallery(data.hits);
  gallery.refresh();

  if (data.totalHits > 15) {
    loadMoreBtn.classList.remove('is-hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  const data = await fetchImages(query, page);
  renderGallery(data.hits);
  gallery.refresh();

  if (data.hits.length < 15 || data.totalHits <= page * 15) {
    loadMoreBtn.classList.add('is-hidden');
    alert("We're sorry, but you've reached the end of search results.");
  }

  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
});

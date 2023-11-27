import PixabayApiService from "./js/pixabay-service";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  searchFormEl: document.querySelector(".search-form"),
  loadMoreBtnEl: document.querySelector(".load-more"),
  galleryEl: document.querySelector(".gallery"),
};

const pixabayApiService = new PixabayApiService();

let lightbox = new SimpleLightbox(".gallery a");

refs.searchFormEl.addEventListener("submit", onSearch);
refs.loadMoreBtnEl.addEventListener("click", onLoadMore);

refs.loadMoreBtnEl.classList.add("is-hidden");

async function onSearch(e) {
  e.preventDefault();
  pixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  if (pixabayApiService.searchQuery === "") {
    await clearPhotoCardGallery();
    await refs.loadMoreBtnEl.classList.add("is-hidden");
    iziToast.info({ message: "please enter your request." });
    return;
  }

  await refs.loadMoreBtnEl.classList.add("is-hidden");
  await pixabayApiService.resetPage();

  const hits = await pixabayApiService.fetchImg();
  const totalHits = hits.data.totalHits;

  if (totalHits < 1) {
    refs.loadMoreBtnEl.classList.add("is-hidden");
    clearPhotoCardGallery();
    iziToast.error({message: "Sorry, there are no images matching your search query. Please try again."});
    return;
  }
  
  await clearPhotoCardGallery();
  await appendPhotoCardMarkup(hits);
  await refs.loadMoreBtnEl.classList.remove("is-hidden");
  iziToast.success({message: `Hooray! We found ${totalHits} images.`});
}

async function onLoadMore() {
  await pixabayApiService.incrementPage();

  const hits = await pixabayApiService.fetchImg();
  const hitsLength = hits.data.hits.length;
  
  await appendPhotoCardMarkup(hits);  
  
  if (hitsLength < 40) {
    refs.loadMoreBtnEl.classList.add("is-hidden");
    iziToast.info({message: "We're sorry, but you've reached the end of search results."});
    return;
  }
}

function appendPhotoCardMarkup(getImg) {
  const img = getImg.data.hits;

  const photoCardMarkup = img.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a class="photo-link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="356" height="200" />
      </a>  
      <div class="info">
        <p class="info-item">
          <b>Likes </br><span class="info-data">${likes}</span></b>
        </p>
        <p class="info-item">
          <b>Views </br><span class="info-data">${views}</span></b>
        </p>
        <p class="info-item">
          <b>Comments </br><span class="info-data">${comments}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads </br><span class="info-data">${downloads}</span></b>
        </p>
      </div>      
    </div>
  `).join("");

  refs.galleryEl.insertAdjacentHTML("beforeend", photoCardMarkup);
  lightbox.refresh(); 
}

function clearPhotoCardGallery() {
  refs.galleryEl.innerHTML = "";
  // pixabayApiService.resetSearchQuery();
}

import{a as u,S as g,i as c}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();u.defaults.baseURL="https://pixabay.com/api";const y="24433477-a7717dfa51cf01b03daed8616";class b{constructor(){this.searchQuery="",this.page=1}async fetchImg(){return await u.get(`/?key=${y}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)}incrementPage(){this.page+=1}resetPage(){this.page=1}}const s={searchFormEl:document.querySelector(".search-form"),loadMoreBtnEl:document.querySelector(".load-more"),galleryEl:document.querySelector(".gallery")},o=new b;let L=new g(".gallery a");s.searchFormEl.addEventListener("submit",w);s.loadMoreBtnEl.addEventListener("click",E);s.loadMoreBtnEl.classList.add("is-hidden");async function w(r){if(r.preventDefault(),o.searchQuery=r.currentTarget.elements.searchQuery.value.trim().toLowerCase(),o.searchQuery===""){await d(),await s.loadMoreBtnEl.classList.add("is-hidden"),c.info({message:"please enter your request."});return}await s.loadMoreBtnEl.classList.add("is-hidden"),await o.resetPage();const t=await o.fetchImg(),i=t.data.totalHits;if(i<1){s.loadMoreBtnEl.classList.add("is-hidden"),d(),c.error({message:"Sorry, there are no images matching your search query. Please try again."});return}await d(),await h(t),await s.loadMoreBtnEl.classList.remove("is-hidden"),c.success({message:`Hooray! We found ${i} images.`})}async function E(){await o.incrementPage();const r=await o.fetchImg(),t=r.data.hits.length;if(await h(r),t<40){s.loadMoreBtnEl.classList.add("is-hidden"),c.info({message:"We're sorry, but you've reached the end of search results."});return}}function h(r){const i=r.data.hits.map(({largeImageURL:l,webformatURL:e,tags:a,likes:n,views:f,comments:p,downloads:m})=>`
    <div class="photo-card">
      <a class="photo-link" href="${l}">
        <img src="${e}" alt="${a}" loading="lazy" width="356" height="200" />
      </a>  
      <div class="info">
        <p class="info-item">
          <b>Likes </br><span class="info-data">${n}</span></b>
        </p>
        <p class="info-item">
          <b>Views </br><span class="info-data">${f}</span></b>
        </p>
        <p class="info-item">
          <b>Comments </br><span class="info-data">${p}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads </br><span class="info-data">${m}</span></b>
        </p>
      </div>      
    </div>
  `).join("");s.galleryEl.insertAdjacentHTML("beforeend",i),L.refresh()}function d(){s.galleryEl.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map

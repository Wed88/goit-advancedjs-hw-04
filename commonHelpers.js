import{a as h,S as g,i as l}from"./assets/vendor-f67ecabd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();h.defaults.baseURL="https://pixabay.com/api";const y="24433477-a7717dfa51cf01b03daed8616";class b{constructor(){this.searchQuery="",this.page=1}async fetchImg(){const a=await h.get(`/?key=${y}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);return this.incrementPage(),a}incrementPage(){this.page+=1}resetPage(){this.page=1}}const s={searchFormEl:document.querySelector(".search-form"),loadMoreBtnEl:document.querySelector(".load-more"),galleryEl:document.querySelector(".gallery")},i=new b;let L=new g(".gallery a");s.searchFormEl.addEventListener("submit",w);s.loadMoreBtnEl.addEventListener("click",E);s.loadMoreBtnEl.classList.add("is-hidden");async function w(r){r.preventDefault(),i.searchQuery=r.currentTarget.elements.searchQuery.value,await s.loadMoreBtnEl.classList.add("is-hidden");const o=(await i.fetchImg()).data.totalHits;if(o<1){s.loadMoreBtnEl.classList.add("is-hidden"),d(),l.error({message:"Sorry, there are no images matching your search query. Please try again."});return}await d(),await i.resetPage(),await i.fetchImg().then(f),await s.loadMoreBtnEl.classList.remove("is-hidden"),l.success({message:`Hooray! We found ${o} images.`})}async function E(){if(await i.fetchImg().then(f),(await i.fetchImg()).data.hits.length<40){s.loadMoreBtnEl.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results."});return}}function f(r){const a=r.data.hits;console.log(a);const o=a.map(({largeImageURL:c,webformatURL:e,tags:t,likes:n,views:u,comments:p,downloads:m})=>`
    <div class="photo-card">
      <a class="photo-link" href="${c}">
        <img src="${e}" alt="${t}" loading="lazy" width="356" height="200" />
      </a>  
      <div class="info">
        <p class="info-item">
          <b>Likes </br><span class="info-data">${n}</span></b>
        </p>
        <p class="info-item">
          <b>Views </br><span class="info-data">${u}</span></b>
        </p>
        <p class="info-item">
          <b>Comments </br><span class="info-data">${p}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads </br><span class="info-data">${m}</span></b>
        </p>
      </div>      
    </div>
  `).join("");s.galleryEl.insertAdjacentHTML("beforeend",o),L.refresh()}function d(){s.galleryEl.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map

import{a as h,i as l}from"./assets/vendor-2dcf4ad5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();h.defaults.baseURL="https://pixabay.com/api";const m="24433477-a7717dfa51cf01b03daed8616";class g{constructor(){this.searchQuery="",this.page=1}async fetchImg(){const r=await h.get(`/?key=${m}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);return this.incrementPage(),r}incrementPage(){this.page+=1}resetPage(){this.page=1}}const a={searchFormEl:document.querySelector(".search-form"),loadMoreBtnEl:document.querySelector(".load-more"),galleryEl:document.querySelector(".gallery")},i=new g;a.searchFormEl.addEventListener("submit",y);a.loadMoreBtnEl.addEventListener("click",b);a.loadMoreBtnEl.classList.add("is-hidden");async function y(s){s.preventDefault(),i.searchQuery=s.currentTarget.elements.searchQuery.value,await a.loadMoreBtnEl.classList.add("is-hidden");const o=(await i.fetchImg()).data.totalHits;if(o<1){a.loadMoreBtnEl.classList.add("is-hidden"),d(),l.error({message:"Sorry, there are no images matching your search query. Please try again."});return}await d(),await i.resetPage(),await i.fetchImg().then(u),await a.loadMoreBtnEl.classList.remove("is-hidden"),l.success({message:`Hooray! We found ${o} images.`})}async function b(){if(await i.fetchImg().then(u),(await i.fetchImg()).data.hits.length<40){a.loadMoreBtnEl.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results."});return}}function u(s){console.log(s.data.hits);const o=s.data.hits.map(({webformatURL:c,tags:e,likes:t,views:n,comments:f,downloads:p})=>`
    <div class='photo-card'>
      <img src='${c}' alt='${e}' loading='lazy' width='356' height='200' />
      <div class='info'>
        <p class='info-item'>
          <b>Likes </br><span class='info-data'>${t}</span></b>
        </p>
        <p class='info-item'>
          <b>Views </br><span class='info-data'>${n}</span></b>
        </p>
        <p class='info-item'>
          <b>Comments </br><span class='info-data'>${f}</span></b>
        </p>
        <p class='info-item'>
          <b>Downloads </br><span class='info-data'>${p}</span></b>
        </p>
      </div>
    </div>
  `).join("");a.galleryEl.insertAdjacentHTML("beforeend",o)}function d(){a.galleryEl.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map

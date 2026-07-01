// graphic js

document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.createElement('div');
  lightbox.className = 'graphic-lightbox';
  lightbox.innerHTML = `
    <div class="graphic-lightbox__backdrop"></div>
    <div class="graphic-lightbox__content" role="dialog" aria-modal="true">
      <button class="graphic-lightbox__close" aria-label="Close">&times;</button>
      <img class="graphic-lightbox__img" src="" alt="">
      <div class="graphic-lightbox__caption">
        <h3 class="graphic-lightbox__title"></h3>
        <p class="graphic-lightbox__desc"></p>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg   = lightbox.querySelector('.graphic-lightbox__img');
  const lightboxTitle = lightbox.querySelector('.graphic-lightbox__title');
  const lightboxDesc  = lightbox.querySelector('.graphic-lightbox__desc');
  const closeBtn      = lightbox.querySelector('.graphic-lightbox__close');
  const backdrop      = lightbox.querySelector('.graphic-lightbox__backdrop');

  const style = document.createElement('style');
  style.textContent = `
    .graphic-lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .graphic-lightbox.is-open { display: flex; }
    .graphic-lightbox__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.82);
      cursor: zoom-out;
    }
    .graphic-lightbox__content {
      position: relative;
      z-index: 1;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: graphic-lightbox-in 0.2s ease-out;
    }
    @keyframes graphic-lightbox-in {
      from { opacity: 0; transform: scale(0.97); }
      to   { opacity: 1; transform: scale(1); }
    }
    .graphic-lightbox__img {
      max-width: 100%;
      max-height: 100vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .graphic-lightbox__caption {
      color: #fff;
      text-align: center;
      margin-top: 16px;
      max-width: 640px;
    }
    .graphic-lightbox__title {
      font-family: 'Space Grotesk', serif;
      font-size: 1.15rem;
      margin: 0 0 6px;
    }
    .graphic-lightbox__desc {
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      font-size: 0.9rem;
      opacity: 0.85;
      margin: 0;
    }
    .graphic-lightbox__close {
      position: absolute;
      top: -40px;
      right: -8px;
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.15s ease;
    }
    .graphic-lightbox__close:hover { opacity: 1; }
    .graphic-card__img { cursor: zoom-in; }
  `;
  document.head.appendChild(style);

  function openLightbox(card) {
    const img   = card.querySelector('.graphic-card__img img');
    const title = card.querySelector('.graphic-card__title');
    const desc  = card.querySelector('.graphic-card__desc');

    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxTitle.innerHTML = title ? title.innerHTML : '';
    lightboxDesc.textContent = desc ? desc.textContent : '';

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.graphic-card').forEach(card => {
    const imgWrap = card.querySelector('.graphic-card__img');
    if (imgWrap) {
      imgWrap.addEventListener('click', () => openLightbox(card));
    }
  });

  // ---- Close interactions ----
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

});
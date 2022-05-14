import cats from '../mock/cats.js';

class LazyLoadingImage {
  constructor($target) {
    this.$imageContainer = document.createElement('article');
    this.$imageContainer.className = 'big-block';

    const template = () =>
      cats
        .map(image => {
          return String.raw`
            <div data-url="${image.url}" class="lazy-loading">
              <img alt="lazy loading image" id="${image.id}" class="cat-image" draggable="false" />
            </div>
          `;
        })
        .join('');

    this.$imageContainer.innerHTML = template();

    $target.appendChild(this.$imageContainer);

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        const url = target.dataset.url;

        target.querySelector('img').src = url;

        console.log('Lazy Loading');

        observer.unobserve(target);
      });
    });

    Array.from(document.querySelectorAll('.lazy-loading')).forEach(el => {
      io.observe(el);
    });
  }
}

export default LazyLoadingImage;

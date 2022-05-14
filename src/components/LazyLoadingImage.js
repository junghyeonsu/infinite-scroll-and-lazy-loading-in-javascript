const images = [
  {
    url: 'https://cdn2.thecatapi.com/images/nG2rFqXai.jpg',
    id: 'nG2rFqXai',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/c2m.jpg',
    id: 'c2m',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/blr4iUu-b.jpg',
    id: 'blr4iUu-b',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/hq.jpg',
    id: 'hq',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/tF_6-Beo_.jpg',
    id: 'tF_6-Beo_',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/avg.jpg',
    id: 'avg',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/4u3.jpg',
    id: '4u3',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/MTc3NjkyNg.gif',
    id: 'MTc3NjkyNg',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/14h.gif',
    id: '14h',
  },
  {
    url: 'https://cdn2.thecatapi.com/images/Z0X1tZQIt.jpg',
    id: 'Z0X1tZQIt',
  },
];

class LazyLoadingImage {
  constructor($target) {
    this.$imageContainer = document.createElement('article');
    this.$imageContainer.className = 'big-block';

    const template = () =>
      images
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

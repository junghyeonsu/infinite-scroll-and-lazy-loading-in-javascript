import api from '../api/index.js';

class Image {
  constructor($target) {
    this.$imageContainer = document.createElement('article');
    this.$imageContainer.className = 'image-container';

    $target.appendChild(this.$imageContainer);
  }

  async appendImage() {
    const image = await api.getCatImage();
    const { url, id } = image[0];

    const imageNode = document.createElement('img');
    imageNode.className = 'cat-image';
    imageNode.draggable = false;
    imageNode.id = id;
    imageNode.src = url;

    this.$imageContainer.appendChild(imageNode);
  }
}

export default Image;

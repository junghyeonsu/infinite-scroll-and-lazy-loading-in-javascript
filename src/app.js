import SomeContents from './components/SomeContents.js';
import LazyLoadingImage from './components/LazyLoadingImage.js';
import Observer from './components/Observer.js';
import Image from './components/Image.js';

class App {
  constructor($target) {
    this.$target = $target;
    this.$someContents = new SomeContents($target);
    this.$lazyLoadingImage = new LazyLoadingImage($target);
    this.$image = new Image($target);
    this.$observer = new Observer($target, this.$image.appendImage.bind(this.$image));
  }
}

export default App;

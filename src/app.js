import SomeContents from './components/SomeContents.js';
import LazyLoadingImage from './components/LazyLoadingImage.js';
import InfiniteScroll from './components/InfiniteScroll.js';
import Image from './components/Image.js';

class App {
  constructor($target) {
    this.$target = $target;
    this.$someContents = new SomeContents($target);
    this.$lazyLoadingImage = new LazyLoadingImage($target);
    this.$image = new Image($target);
    this.$infiniteScroll = new InfiniteScroll($target, this.$image.appendImage.bind(this.$image));
  }
}

export default App;

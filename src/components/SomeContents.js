class SomeContents {
  constructor($target) {
    this.$node = document.createElement('div');
    this.$node.className = 'something';
    this.$node.textContent = '어떤 컨텐츠가 있습니다.';

    $target.appendChild(this.$node);
  }
}

export default SomeContents;

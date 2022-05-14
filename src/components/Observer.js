class Observer {
  constructor($target, onIntersecting) {
    this.$observerTarget = document.createElement('div');
    this.$observerTarget.className = 'observer-target';
    this.$observerTarget.textContent = '이 곳에 스크롤이 도착하면 이미지를 요청합니다.';

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        onIntersecting();
        console.log('Dynamic Image Request');
      });
    });

    io.observe(this.$observerTarget);
    $target.appendChild(this.$observerTarget);
  }
}

export default Observer;

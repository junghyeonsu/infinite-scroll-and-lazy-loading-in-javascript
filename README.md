# Lazy Loading & Infinite Scrolling 구현하기

> `Intersection Observer`를 사용해서 `Vanilla JavaScript`에서 `Lazy Loading` & `Infinite Scrolling` 구현하기

# 데모 링크

> [요기서 고양이들을 만나보세요!](https://junghyeonsu.github.io/infinite-scroll-and-lazy-loading-in-javascript/)

크롬 개발자 도구를 켜고 네트워크 탭 혹은 콘솔창을 확인해보세요.
위의 10장까지는 미리 생성해놓은 `lazy loading` 기법을 적용한 이미지입니다.
그 아래서부터는 [thecatapi.com](https://thecatapi.com/)에서 제공하는 api를 이용해서 `infinite scroll`을 구현해놓았습니다. 코드에 대한 설명은 아래에 첨부했습니다.

# 데모 영상

![lazy and infinite scrolling](./public/lazy-and-infinite.gif)

# Lazy Loading

> 리소스를 전부 처음부터 받아오는 것이 아니라, 해당 리소스가 필요할 때 동적으로 부르도록 하는 기법

```javascript
// 템플릿을 만든다.
// 이미지에 src를 바로 붙여서 이미지를 전부 로딩하는 것이 아니라
// Intersection Observer로 해당 img 태그에 도달했을 때 src를 붙여준다.
// 그래서 아래 템플릿에는 src 속성이 없음
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

// 해당 컴포넌트에 넣어준다.
this.$imageContainer.innerHTML = template();
$target.appendChild(this.$imageContainer);

// IntersectionObserver 생성
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // observer 대상이 화면에 없으면 바로 return

    const target = entry.target;
    const url = target.dataset.url;

    // 해당 img 태그가 사용자의 화면에 포착됐을 때 src에 url을 붙여준다.
    // url은 아까 template 생성할 때 dataset으로 붙여놓음.
    target.querySelector('img').src = url;

    console.log('Lazy Loading');

    // 한 번 도착해서 이미지에 src 태그를 붙여줬으면 해당 요소는 observer를 없애줌
    observer.unobserve(target);
  });
});

// 위 template에서 만든 div.lazy-loading 요소에 observer를 붙여준다.
Array.from(document.querySelectorAll('.lazy-loading')).forEach(el => {
  io.observe(el);
});
```

# Infinite Scroll

> 모든 컨텐츠를 한꺼번에 불러오는 것이 아니라, 유저가 스크롤해서 아래에 도달했을 때 일정부분의 데이터를 긁어와서 컨텐츠가 끝나지 않는 것 처럼 느끼게 하는 것

> 페이스북, 인스타그램을 생각하면 됨

```javascript
// 유저 스크롤이 제일 아래에 도달했는지 확인할 요소 생성하기
this.$observerTarget = document.createElement('div');
this.$observerTarget.className = 'observer-target';
this.$observerTarget.textContent = '이 곳에 스크롤이 도착하면 이미지를 요청합니다.';

// IntersectionObserver 선언
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // IntersectionObserver가 관찰할 요소가 현재 화면에 없으면 바로 return

    // 요기서는 해당 요소에 도달했다는 소리니까, 고양이 api를 호출하는 코드들
    onIntersecting();
    console.log('Infinite Scroll Get Image');
  });
});

// 위에서 만든 제일 아래에 둘 요소에 IntersectionObserver로 observing하도록 함
io.observe(this.$observerTarget);
$target.appendChild(this.$observerTarget);
```

```javascript
// onIntersecting 함수
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
```

# 참고

> 아래의 글들을 참고해서 직접 구현했습니다.

- [IntersectionObserver를 이용한 이미지 동적 로딩 기능 개선 | 레진 기술 블로그](https://tech.lezhin.com/2017/07/13/intersectionobserver-overview)

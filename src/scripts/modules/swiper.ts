import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

export default function SetSwiper() {
  const sliderElm = document.querySelector('.js-slider');
  if (!sliderElm) return;

  let swiperInstance: Swiper | null = null;
  const currentSlideIndicator = document.querySelector('.p-style__current-slide');

  // スライドショーの初期化設定
  const initSlider = () => {
    swiperInstance = new Swiper('.swiper-container', {
      modules: [Autoplay, Navigation],
      loop: true, // 無限ループを有効化
      slidesPerView: 5, // 1度に表示するスライドの数
      spaceBetween: 20, // 各スライド間のスペース（ピクセル）
      autoplay: {
        delay: 3800, // 自動スライドの遅延時間
        disableOnInteraction: false,
      },
      speed: 1000, // スライドの切り替わり速度
      navigation: {
        nextEl: '.p-style__btn--next',
        prevEl: '.p-style__btn--prev',
      },
      on: {
        slideChange: function () {
          if (swiperInstance && currentSlideIndicator) {
            const realIndex = (swiperInstance.realIndex % 5) + 1; // 1から始まる実インデックス
            const totalSlides = 5; // 実際のスライド数は5枚

            currentSlideIndicator.textContent = `${realIndex} / ${totalSlides}`;
          }
        },
      },
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { isIntersecting } = entry;
      if (isIntersecting) {
        if (!swiperInstance) {
          initSlider();
        }
      }
    });
  });
  observer.observe(sliderElm);
}

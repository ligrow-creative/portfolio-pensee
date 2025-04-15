import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

// ========================
// smooth scroll
// ========================

export default function SetSmoothScroll() {
  // すべてのhref="#"のaタグを取得
  const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
  // 存在確認
  if (!smoothScrollTrigger) return;

  // 取得したaタグにそれぞれクリックイベントを設定
  for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {
      // ターゲットの位置を取得
      // デフォルトの動きを排除
      e.preventDefault();
      // 各a要素のリンク先を取得 & 存在確認
      const href = smoothScrollTrigger[i].getAttribute('href');
      if (!href) return;
      // リンク先の要素を取得 & 存在確認
      const targetElement = document.getElementById(href.replace('#', ''));
      if (!targetElement) return;

      // targetElementのviewportからの位置を取得
      const rect = targetElement.getBoundingClientRect().top;
      // 現在のスクロール量を取得
      const offset = window.scrollY;
      // 最終的なtarget位置
      const target = rect + offset;

      // スムーススクロール実行
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    });
  }
}

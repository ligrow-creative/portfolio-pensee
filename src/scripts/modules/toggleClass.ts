// ========================
// toggle class
// ========================
export default function SetToggleClass() {
  document.addEventListener('DOMContentLoaded', () => {
    const toggleElement = document.querySelector('.js-toggle-class') as HTMLElement;
    const targetSection = document.querySelector('.js-toggle-class-target') as HTMLElement;

    const observerOptions: IntersectionObserverInit = {
      root: null, // ビューポートを基準
      rootMargin: '0px', // ビューポートのマージン
      threshold: 0, // 0%が交差したときにコールバックを実行
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ターゲットセクションがビューポートに入った場合
          toggleElement.classList.add('is-active');
        } else {
          // ターゲットセクションがビューポートから出た場合
          toggleElement.classList.remove('is-active');
        }
      });
    };

    // IntersectionObserverのインスタンスを作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(targetSection); // ターゲットセクションを監視
  });
}

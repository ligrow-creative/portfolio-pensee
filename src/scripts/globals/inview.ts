import { offset } from '~/helper/element';

class Inview {
  private observer: IntersectionObserver | null = null;

  private options: IntersectionObserverInit;

  private isInview: boolean;

  private inviewInfiniteValue: number;

  constructor(private elm: HTMLElement) {
    this.isInview = false;
    const rootmarginPer: number = elm.dataset.rootmargin ? Number(elm.dataset.rootmargin) : -15;

    this.options = {
      root: null,
      rootMargin: `0px 0px ${rootmarginPer}%`,
      threshold: [0.1],
    };

    this.inviewInfiniteValue = Number(this.elm.getAttribute('data-inview-infinite'));
  }

  init(): void {
    if (this.isOver()) {
      this.onScreenHandler();
    } else {
      this.setObserver();
    }
  }

  private onScreenHandler() {
    this.isInview = true;
    this.elm.classList.add('is-inview');
    // 対象要素のdata属性でinviewのrepeat指定がない場合は
    if (!(this.inviewInfiniteValue === 1)) {
      this.destroy();
    }
  }

  // observerを削除
  private destroy() {
    if (this.observer !== null) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // observerをセット
  private setObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onScreenHandler();
        }
      });
    }, this.options);
    this.observer.observe(this.elm);
  }

  // モニターを超えたかどうか
  private isOver() {
    const isOver = window.pageYOffset > offset(this.elm).top;
    return isOver;
  }
}

const SetInview = (): void => {
  const elms = document.querySelectorAll<HTMLElement>('.js-inview');
  if (!elms) return;

  Array.from(elms).forEach((elm) => {
    new Inview(elm).init();
  });
};

export default SetInview;

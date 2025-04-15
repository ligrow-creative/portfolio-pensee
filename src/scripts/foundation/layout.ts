import Breakpoints from '~/constants/breakpoints';

class Layout {
  public isSP = false;
  public isTAB = false;
  public isPC = false;
  public documentWidth = 0;
  public documentHeight = 0;
  public windowWidth = 0;
  public windowHeight = 0;
  public scrollBarWidth = 0;
  public breakpointSP = Breakpoints.Tab;
  public breakpointTAB = Breakpoints.Tab;

  constructor() {
    const ro = new ResizeObserver(() => this.handleResize());
    ro.observe(document.body);
  }

  handleResize(): void {
    this.isSP = window.matchMedia(`(max-width: ${this.breakpointSP}px)`).matches;
    this.isTAB = window.matchMedia(`(max-width: ${this.breakpointTAB}px)`).matches;
    this.isPC = !this.isSP && !this.isTAB;
    this.documentWidth = document.body.clientWidth;
    this.documentHeight = document.body.clientHeight;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    // スクロールバー無し
    const docW = this.documentWidth * 0.01;
    const docH = this.documentHeight * 0.01;
    document.documentElement.style.setProperty('--vw', `${docW}px`);
    document.documentElement.style.setProperty('--vh', `${docH}px`);

    // ウインドウサイズ（SPはメニュー拡大縮小で可変）
    const winW = this.windowWidth * 0.01;
    const winH = this.windowHeight * 0.01;
    document.documentElement.style.setProperty('--vw-win', `${winW}px`);
    document.documentElement.style.setProperty('--vh-win', `${winH}px`);

    // スクロールバー
    this.scrollBarWidth = (winW - docW) * 100;
    document.documentElement.style.setProperty('--scroll-bar', `${this.scrollBarWidth}px`);
  }
}

const SetLayout = (): void => {
  const APP = window.APP || {};
  window.APP = APP;
  APP.Layout = new Layout();
};

export default SetLayout;

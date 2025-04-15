import StateClasses from '~/constants/state-classes';
import Events from '~/constants/events';
import gsap, { Power2 } from 'gsap';

// ========================
// header menu
// ========================

export default function SetMenu() {
  const bgrBtnElm = document.querySelector<HTMLElement>('.js-bgr-btn');
  if (!bgrBtnElm) return;

  const addClassElm = document.querySelector<HTMLElement>('.js-wrapper');
  if (!addClassElm) return;

  const menuLinkElms = document.querySelectorAll<HTMLElement>('.js-menu-link');
  const menuElm = addClassElm.querySelector<HTMLElement>('.js-menu');
  if (!menuElm) return;

  const { body } = document;
  const delayBase = 0.06;
  const delayElms = document.querySelectorAll<HTMLElement>('[data-delay]');

  // 各要素のdelay時間を設定
  delayElms.forEach((elm) => {
    const delayAttr = elm.getAttribute('data-delay');
    const delayTime = Number(delayAttr) * delayBase + 0.6;
    elm.style.transitionDelay = `${delayTime}s`;
  });

  const toggleMenu = (isOpen: boolean) => {
    if (isOpen) {
      addClassElm.classList.remove(StateClasses.Menu.Close);
      addClassElm.classList.add(StateClasses.Menu.Open);
      body.classList.add(StateClasses.Menu.Open);
      body.style.overflow = 'hidden'; // スクロールを無効にする

      gsap.set(menuElm, { display: 'block', autoAlpha: 0 });
      gsap.to(menuElm, {
        duration: 0.35,
        autoAlpha: 1,
        ease: Power2.easeIn,
        onComplete: () => setRepeatInview(), // メニューを開いた時もinviewをリセット
      });
    } else {
      addClassElm.classList.remove(StateClasses.Menu.Open);
      addClassElm.classList.add(StateClasses.Menu.Close);
      body.classList.remove(StateClasses.Menu.Open);
      body.style.overflow = ''; // スクロールを再度有効にする

      gsap.to(menuElm, {
        duration: 0.5,
        autoAlpha: 0,
        ease: Power2.easeIn,
        onComplete: () => {
          gsap.set(menuElm, { display: 'none' });
          setRepeatInview();
        },
      });
    }
  };

  const setRepeatInview = () => {
    const inviewElms = menuElm.querySelectorAll<HTMLElement>('.js-inview');
    inviewElms.forEach((elm) => {
      elm.classList.remove('is-inview');
    });
  };

  bgrBtnElm.addEventListener(Events.Click, () => {
    const isOpen = addClassElm.classList.contains(StateClasses.Menu.Open);
    toggleMenu(!isOpen);
  });

  menuLinkElms.forEach((elm) => {
    elm.addEventListener(Events.Click, () => {
      toggleMenu(false);
    });
  });
}

/* constants */
import Env from '~/constants/env';

/* foundation */
import SetLayout from '~/foundation/layout';
import SetBrowser from '~/foundation/browser';

/* globals */
import SetInview from '~/globals/inview';

/* modules */
import SetMenu from '~/modules/menu';
import SetPopup from './modules/popup';
import SetSmoothScroll from './modules/smoothScroll';
import SetSplash from './modules/splash';
import SetSwiper from './modules/swiper';
import SetToggleClass from './modules/toggleClass';

export const Init = async () => {
  /* foundation */
  SetLayout();
  SetBrowser();

  /* globals */
  SetInview();

  /* modules */
  SetMenu();
  SetPopup();
  SetSplash();
  SetSmoothScroll();
  SetSwiper();
  SetToggleClass();

  /* development */
  if (Env.isDev) {
    const Stats = (await import('~/foundation/stats')).default;
    new Stats().start();
  }
};

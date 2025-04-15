import Breakpoints from '~/constants/breakpoints';

const MediaQueryList = {
  Sp: window.matchMedia(`screen and (max-width: ${Breakpoints.Tab - 0.02}px)`),
  Tab: window.matchMedia(
    `(min-width: ${Breakpoints.Tab}px) and (max-width: ${Breakpoints.Laptop - 0.02}px)`,
  ),
  Pc: window.matchMedia(`screen and (min-width: ${Breakpoints.Tab}px)`),
  UnderLaptop: window.matchMedia(`screen and (max-width: ${Breakpoints.Laptop - 0.02}px)`),
  OverLaptop: window.matchMedia(`screen and (min-width: ${Breakpoints.Laptop}px)`),
  UnderDesktop: window.matchMedia(`screen and (max-width: ${Breakpoints.Desktop - 0.02}px)`),
  OverDesktop: window.matchMedia(`screen and (min-width: ${Breakpoints.Desktop}px)`),
} as const;

export default MediaQueryList;

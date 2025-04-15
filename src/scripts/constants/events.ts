const Events = {
  Load: 'DOMContentLoaded',
  Pageshow: 'pageshow',
  Resize: 'resize',
  ResizeLS: 'orientationchange',
  Scroll: 'scroll',
  Click: 'click',
  Wheel: 'wheel',
  Input: 'mousemove',
  Change: 'change',
  ToStart: 'touchstart',
  ToEnd: 'touchend',
  ToMove: 'touchmove',
  MoEnter: 'mouseenter',
  MoLeave: 'mouseleave',
  MoMove: 'mousemove',
  TransStart: 'transitionstart',
  TransEnd: 'transitionend',
  Keydown: 'keydown',
} as const;

export default Events;

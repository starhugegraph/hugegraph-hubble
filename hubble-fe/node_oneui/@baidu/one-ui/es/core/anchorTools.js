import raf from 'raf';
import { getScroll } from './commonTools';
export var getOffsetTop = function getOffsetTop(element, container) {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument && element.ownerDocument.documentElement;
      return rect.top - (container && container.clientTop || 0);
    }

    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
};
export var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } // eslint-disable-next-line no-return-assign


  return cc / 2 * ((t -= 2) * t * t + 2) + b;
};
export var sharpMatcherRegx = /#([^#]+)$/;
export var scrollToDom = function scrollToDom(href, offsetTop, getContainer, callback) {
  if (offsetTop === void 0) {
    offsetTop = 0;
  }

  if (callback === void 0) {
    callback = function callback() {};
  }

  var container = getContainer();
  var scrollTop = getScroll(container, true);
  var sharpLinkMatch = sharpMatcherRegx.exec(href);

  if (!sharpLinkMatch) {
    return;
  }

  var targetElement = document.getElementById(sharpLinkMatch[1]);

  if (!targetElement) {
    return;
  }

  var eleOffsetTop = getOffsetTop(targetElement, container);
  var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  var startTime = Date.now();

  var frameFunc = function frameFunc() {
    var timestamp = Date.now();
    var time = timestamp - startTime;
    var nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);

    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      container.scrollTop = nextScrollTop;
    }

    if (time < 450) {
      raf(frameFunc);
    } else {
      callback();
    }
  };

  raf(frameFunc);
};
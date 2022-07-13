import raf from 'raf';
import {getScroll} from './commonTools';

export const getOffsetTop = (element, container) => {
    if (!element) {
        return 0;
    }

    if (!element.getClientRects().length) {
        return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument && element.ownerDocument.documentElement;
            return rect.top - ((container && container.clientTop) || 0);
        }
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
};

export const easeInOutCubic = (t, b, c, d) => {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    // eslint-disable-next-line no-return-assign
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
};

export const sharpMatcherRegx = /#([^#]+)$/;

export const scrollToDom = (
    href,
    offsetTop = 0,
    getContainer,
    callback = () => {},
) => {
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const sharpLinkMatch = sharpMatcherRegx.exec(href);
    if (!sharpLinkMatch) {
        return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
        return;
    }
    const eleOffsetTop = getOffsetTop(targetElement, container);
    const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
    const startTime = Date.now();
    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
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

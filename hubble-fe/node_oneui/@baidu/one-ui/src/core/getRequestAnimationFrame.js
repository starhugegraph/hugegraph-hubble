const availablePrefixs = ['moz', 'ms', 'webkit'];

const requestAnimationFramePolyfill = () => {
    let lastTime = 0;
    return callback => {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
};

export default function getRequestAnimationFrame() {
    if (typeof window === 'undefined') {
        return () => {};
    }
    if (window.requestAnimationFrame) {
        // https://github.com/vuejs/vue/issues/4465
        return window.requestAnimationFrame.bind(window);
    }

    const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0];

    return prefix
        ? window[`${prefix}RequestAnimationFrame`]
        : requestAnimationFramePolyfill();
}

export function cancelRequestAnimationFrame(id) {
    if (typeof window === 'undefined') {
        return null;
    }
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    const isAvailable = key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window;
    const prefix = availablePrefixs.filter(isAvailable)[0];

    return prefix
        ? (window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]).call(this, id)
        : clearTimeout(id);
}

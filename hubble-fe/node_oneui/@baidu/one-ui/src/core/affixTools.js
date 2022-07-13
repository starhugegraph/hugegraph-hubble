/**
 * @file 固钉 - 工具方法
 * @author huangshiming
 */

/**
 * 获取target的scrollTop
 * @param {Function} target 获取target
 * @param {number} top 是否是top模式
 * @return {ret} 所需要的scrollTop值
 */
export const getScroll = (target, top) => {
    if (typeof window === 'undefined') {
        return 0;
    }

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }

    return ret;
};

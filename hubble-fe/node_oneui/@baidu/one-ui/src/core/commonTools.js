/**
 * @file 查询含中文的字符串长度
 *
 * @author Shan Qianmin
 * @date 2017/11/20
 */

import _ from 'lodash';

export const COUNT_MODE = {
    CHINA: 'cn',
    ENGLISH: 'en'
};

export const handleControlled = (propsKey, stateKey) => (
    propsKey == null ? stateKey : propsKey
);

export const handleEventParams = (e = {}, that) => {
    const {value, errorMessage} = that.state;
    e.value = value;
    e.errorMessage = errorMessage;
    return e;
};

const handleFilter = (str = '', arr = []) => {
    arr.forEach(element => {
        if (typeof element === 'string') {
            str = str.replace(new RegExp(element, 'g'), '');
        }
    });
    return str;
};

export const CHINA_COUNT_MODE = COUNT_MODE.CHINA;
const ENGLISH_COUNT_MODE = COUNT_MODE.ENGLISH;

export const getLengthInBytes = (str, needTrim = true, filterArray = [], countMode = CHINA_COUNT_MODE) => {
    if (str == null) {
        return 0;
    }
    if (!_.isString(str) && !_.isNumber(str)) {
        throw new Error('传入的数据为非字符串或数字');
    }

    if (needTrim) {
        str = `${str}`.trim();
    }

    if (filterArray.length) {
        str = handleFilter(str, filterArray);
    }
    const b = str.match(/[^\x20-\xff]/g);
    return str.length + ((!b || countMode === ENGLISH_COUNT_MODE) ? 0 : b.length);
};

export const getRealLength = ({getLength, filterArray, countMode}, value) => (
    getLength ? getLength(value) : getLengthInBytes(value, true, filterArray, countMode)
);

export const handleCountTips = (currentLine, maxLine) => (maxLine != null ? `${currentLine}/${maxLine}` : null);

// 如果是组件显示组件，如果是node显示node
export const showRender = render => (typeof render === 'function' ? render() : render);

const getAllIndex = (array, value, fromIndex = 0, result) => {
    const index = array.indexOf(value, fromIndex);
    if (index !== -1) {
        result.push(index);
        getAllIndex(array, value, index + 1, result);
    }
};

export const getAllIndexFromArray = (array, value) => {
    const result = [];
    getAllIndex(array, value, 0, result);
    return result;
};

// 顺序排序
export const sortArraySequence = array => array.sort((a, b) => (a - b));

// 校验字符串是否是数字
export const strIsNumber = value => /^[1-9]\d*$/.test(value);

// 数组展平
export const flattern = options => {
    let newOptions = [];
    _.map(options, option => {
        newOptions.push(option);
        if (option.children && option.children.length) {
            _.map(option.children, (item, index) => {
                option.children[index].parent = [option.label];
                option.children[index].parentValue = [`${option.value}`];
            });
            newOptions = newOptions.concat(option.children);
        }
    });
    return newOptions;
};

// 将空行过滤掉
export const getNoEmptyArray = (array = []) => array.filter(currentValue => currentValue.trim());

export const getNoEmptyArrayLength = (array = []) => getNoEmptyArray(array).length;

export const noop = () => {};

export const locationRemoveProps = ['location', 'tipLocation', 'errorLocation', 'tipText'];

export const stopPropagation = e => {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
};

export function flatArray(data, childrenName = 'children') {
    const result = [];
    const loop = array => {
        array.forEach(item => {
            if (item[childrenName]) {
                const newItem = {...item};
                delete newItem[childrenName];
                result.push(newItem);
                if (item[childrenName].length > 0) {
                    loop(item[childrenName]);
                }
            } else {
                result.push(item);
            }
        });
    };
    loop(data);
    return result;
}

export function treeMap(tree, mapper, childrenName = 'children') {
    return tree.map((node, index) => {
        const extra = {};
        if (node[childrenName]) {
            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
        }
        return {
            ...mapper(node, index),
            ...extra
        };
    });
}

export function flatFilter(tree, callback) {
    return tree.reduce((acc, node) => {
        if (callback(node)) {
            acc.push(node);
        }
        if (node.children) {
            const children = flatFilter(node.children, callback);
            acc.push(...children);
        }
        return acc;
    }, []);
}


export function createStore(initialState) {
    let state = initialState;
    const listeners = [];
    function setState(partial) {
        state = {
            ...state,
            ...partial
        };
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    return {
        setState,
        getState,
        subscribe
    };
}

export function remove(array, item) {
    const index = array.indexOf(item);
    const front = array.slice(0, index);
    const last = array.slice(index + 1, array.length);
    return front.concat(last);
}

// 向下兼容处理尺寸
export const transSizeOfDefault = (oldSize, newSize) => {
    if (oldSize === 'default') {
        return newSize;
    }
    return oldSize;
};


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
        ret = document.documentElement[method];
    }
    return ret;
};

export const intersperseSpace = list => {
    return list.reduce((current, item) => [...current, ' ', item], []).slice(1);
};

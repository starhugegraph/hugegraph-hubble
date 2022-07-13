/**
 * @file 时间选择器工具方法
 */
import moment from 'moment';

export const noop = () => {};

export const generateOptions = (len, disabledOptions, hideDisabledOptions, step = 1) => {
    const arr = [];
    for (let value = 0; value < len; value += step) {
        if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
            arr.push(value);
        }
    }
    return arr;
};

export const toNearestValidTime = (time, hourOptions, minuteOptions, secondOptions) => {
    const hour = hourOptions
        .slice()
        .sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
    const minute = minuteOptions
        .slice()
        .sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
    const second = secondOptions
        .slice()
        .sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
    return moment(`${hour}:${minute}:${second}`, 'HH:mm:ss');
};

export const fomatStr = (str = '') => {
    const str1 = str.replace(/：/g, ':');
    const str2 = str1.replace(/\s+/g, '');
    const strArr = str2.split(':') || [];
    return strArr.map(item => {
        return item.replace(/[^0-9]/g, '');
    }).join(':');
};

export const addZero = (str, seprate = ':') => {
    const strArr = (str && str.split(seprate)) || [];
    return strArr.map(item => {
        if (item === '') {
            return item;
        }
        return item < 10 ? `0${+item}` : +item;
    }).join(seprate);
};

export const formatOption = (option, disabledOptions) => {
    let value = `${option}`;
    if (option < 10) {
        value = `0${option}`;
    }

    let disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true;
    }

    return {
        value,
        disabled
    };
};

export const scrollTo = (element, to, duration) => {
    const requestAnimationFrame = window.requestAnimationFrame
        || function requestAnimationFrameTimeout() {
            return setTimeout(arguments[0], 10); // eslint-disable-line
        };
    // jump to target if duration zero
    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    requestAnimationFrame(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    });
};

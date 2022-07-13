/**
 * @file    less plugin - 色彩盘
 * @author  mahaina (mahaina@baidu.com)
 * @date    2019-05-16 11:36:39
 */
const kolor = require('kolor');

const MAX_S = 100;
const MIN_S = 5;
const MAX_B = 100;
const MIN_B = 0;

const sIncStep = 5;
const bIncStep = 5;
const bDecStep = 15;
const hStep = 1;

function wrap(value, min, max) {
    if (min > max) {
        max = min + max;
        min = max - min;
        max = max - min;
    }
    const interval = max - min;
    return min + (((value % interval) + interval) % interval);
}

function deg(value) {
    return wrap(value, 0, 360);
}

function getColor(h, s, v, i, lightNum) {
    const sDecStep = Math.round(s / 5);
    if (i === lightNum) {
        return {h, s, v};
    }
    if (i > lightNum) {
        i = i - 1 - lightNum;
        return {
            h: deg(Math.round(h - (i + 1) * hStep)),
            s: Math.round(Math.min(MAX_S, s + (i + 1) * sIncStep)),
            v: Math.round(Math.max(MIN_B, v - (i + 1) * bDecStep))
        };
    }
    return {
        h: deg(Math.round(h + (5 - i) * hStep)),
        s: Math.round(Math.max(MIN_S, s - (5 - i) * sDecStep)),
        v: Math.round(Math.min(MAX_B, v + (5 - i) * bIncStep))
    };
}

function getHSV(rgb, idx, lightNum) {
    const cl = kolor.rgb(rgb).hsv();
    const {h, s, v} = getColor(cl.h(), cl.s() * 100, cl.v() * 100, idx, lightNum);
    return kolor(`hsv(${h}, ${s}%, ${v}%)`);
}
const primaryInErrorHRange = [[0, 5], [355, 360]];
const primaryInColdHRange = [[64, 320]];
// const primaryInWarmHRange = [[321, 360], [0, 63]];
function isHSVInError({h}) {
    let isInError = false;
    primaryInErrorHRange.map(range => {
        if (h >= range[0] && h <= range[1]) {
            isInError = true;
        }
    });
    return isInError;
}
function isCold({h}) {
    let isCold = false;
    primaryInColdHRange.map(range => {
        if (h >= range[0] && h <= range[1]) {
            isCold = true;
        }
    });
    return isCold;
}

const functionalType = {
    success: {
        cold: [125, 70, 75],
        warm: [95, 70, 75]
    },
    warning: {
        cold: [18, 70, 95],
        warm: [24, 75, 95]
    },
    error: {
        cold: [355, 70, 90],
        warm: [5, 70, 90]
    }
};

function getFunctionalColor({h, s, v}, type) {
    // 如果主色的H值处于5-0/360-355区间，直接用主色替换辅助色的错误色，此时非中性色为3种
    if (isHSVInError({h}) && type === 'error') {
        return [h, s, v];
    }
    if (isCold({h})) {
        return functionalType[type].cold;
    }
    return functionalType[type].warm;
}
module.exports = {
    install(less, pluginManager, functions) {
        functions.add('colorPalette', (primaryColor, idx, lightNum = 5) => {
            const pColor = getHSV(primaryColor.rgb, idx.value, lightNum);
            return pColor.hex();
        });
        // * 交叉叠加规则：如果品牌色位于错误色、通过色、警示色的冷暖区间内，品牌色可以定义成某一种功能色；
        // * 如果主色的H值处于5-0/360-355区间，直接用主色替换辅助色的红色，此时非中性色为3种
        // * 错误红色H值区间：5-0/360-355
        // * 通过绿色H值区间：95-125
        // * 警示橙色H值区间：18-24
        functions.add('functionalColor', (primaryColor, {value: type}) => {
            const primaryHSV = kolor.rgb(primaryColor.rgb).hsv();
            const ph = Math.round(primaryHSV.h());
            const ps = Math.round(primaryHSV.s() * 100);
            const pv = Math.round(primaryHSV.v() * 100);
            const [h, s, v] = getFunctionalColor({h: ph, s: ps, v: pv}, type);
            return kolor(`hsv(${h}, ${s}%, ${v}%)`).hex();
        });
    }
};

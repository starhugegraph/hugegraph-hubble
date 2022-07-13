"use strict";

/**
 * @file    less plugin - 色彩盘
 * @author  mahaina (mahaina@baidu.com)
 * @date    2019-05-16 11:36:39
 */
var kolor = require('kolor');

var MAX_S = 100;
var MIN_S = 5;
var MAX_B = 100;
var MIN_B = 0;
var sIncStep = 5;
var bIncStep = 5;
var bDecStep = 15;
var hStep = 1;

function wrap(value, min, max) {
  if (min > max) {
    max = min + max;
    min = max - min;
    max = max - min;
  }

  var interval = max - min;
  return min + (value % interval + interval) % interval;
}

function deg(value) {
  return wrap(value, 0, 360);
}

function getColor(h, s, v, i, lightNum) {
  var sDecStep = Math.round(s / 5);

  if (i === lightNum) {
    return {
      h: h,
      s: s,
      v: v
    };
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
  var cl = kolor.rgb(rgb).hsv();

  var _getColor = getColor(cl.h(), cl.s() * 100, cl.v() * 100, idx, lightNum),
      h = _getColor.h,
      s = _getColor.s,
      v = _getColor.v;

  return kolor("hsv(" + h + ", " + s + "%, " + v + "%)");
}

var primaryInErrorHRange = [[0, 5], [355, 360]];
var primaryInColdHRange = [[64, 320]]; // const primaryInWarmHRange = [[321, 360], [0, 63]];

function isHSVInError(_ref) {
  var h = _ref.h;
  var isInError = false;
  primaryInErrorHRange.map(function (range) {
    if (h >= range[0] && h <= range[1]) {
      isInError = true;
    }
  });
  return isInError;
}

function isCold(_ref2) {
  var h = _ref2.h;
  var isCold = false;
  primaryInColdHRange.map(function (range) {
    if (h >= range[0] && h <= range[1]) {
      isCold = true;
    }
  });
  return isCold;
}

var functionalType = {
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

function getFunctionalColor(_ref3, type) {
  var h = _ref3.h,
      s = _ref3.s,
      v = _ref3.v;

  // 如果主色的H值处于5-0/360-355区间，直接用主色替换辅助色的错误色，此时非中性色为3种
  if (isHSVInError({
    h: h
  }) && type === 'error') {
    return [h, s, v];
  }

  if (isCold({
    h: h
  })) {
    return functionalType[type].cold;
  }

  return functionalType[type].warm;
}

module.exports = {
  install: function install(less, pluginManager, functions) {
    functions.add('colorPalette', function (primaryColor, idx, lightNum) {
      if (lightNum === void 0) {
        lightNum = 5;
      }

      var pColor = getHSV(primaryColor.rgb, idx.value, lightNum);
      return pColor.hex();
    }); // * 交叉叠加规则：如果品牌色位于错误色、通过色、警示色的冷暖区间内，品牌色可以定义成某一种功能色；
    // * 如果主色的H值处于5-0/360-355区间，直接用主色替换辅助色的红色，此时非中性色为3种
    // * 错误红色H值区间：5-0/360-355
    // * 通过绿色H值区间：95-125
    // * 警示橙色H值区间：18-24

    functions.add('functionalColor', function (primaryColor, _ref4) {
      var type = _ref4.value;
      var primaryHSV = kolor.rgb(primaryColor.rgb).hsv();
      var ph = Math.round(primaryHSV.h());
      var ps = Math.round(primaryHSV.s() * 100);
      var pv = Math.round(primaryHSV.v() * 100);

      var _getFunctionalColor = getFunctionalColor({
        h: ph,
        s: ps,
        v: pv
      }, type),
          h = _getFunctionalColor[0],
          s = _getFunctionalColor[1],
          v = _getFunctionalColor[2];

      return kolor("hsv(" + h + ", " + s + "%, " + v + "%)").hex();
    });
  }
};
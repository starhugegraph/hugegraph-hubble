"use strict";

exports.__esModule = true;
exports.scrollTo = exports.formatOption = exports.addZero = exports.fomatStr = exports.toNearestValidTime = exports.generateOptions = exports.noop = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 时间选择器工具方法
 */
var noop = function noop() {};

exports.noop = noop;

var generateOptions = function generateOptions(len, disabledOptions, hideDisabledOptions, step) {
  if (step === void 0) {
    step = 1;
  }

  var arr = [];

  for (var value = 0; value < len; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }

  return arr;
};

exports.generateOptions = generateOptions;

var toNearestValidTime = function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions) {
  var hour = hourOptions.slice().sort(function (a, b) {
    return Math.abs(time.hour() - a) - Math.abs(time.hour() - b);
  })[0];
  var minute = minuteOptions.slice().sort(function (a, b) {
    return Math.abs(time.minute() - a) - Math.abs(time.minute() - b);
  })[0];
  var second = secondOptions.slice().sort(function (a, b) {
    return Math.abs(time.second() - a) - Math.abs(time.second() - b);
  })[0];
  return (0, _moment["default"])(hour + ":" + minute + ":" + second, 'HH:mm:ss');
};

exports.toNearestValidTime = toNearestValidTime;

var fomatStr = function fomatStr(str) {
  if (str === void 0) {
    str = '';
  }

  var str1 = str.replace(/：/g, ':');
  var str2 = str1.replace(/\s+/g, '');
  var strArr = str2.split(':') || [];
  return strArr.map(function (item) {
    return item.replace(/[^0-9]/g, '');
  }).join(':');
};

exports.fomatStr = fomatStr;

var addZero = function addZero(str, seprate) {
  if (seprate === void 0) {
    seprate = ':';
  }

  var strArr = str && str.split(seprate) || [];
  return strArr.map(function (item) {
    if (item === '') {
      return item;
    }

    return item < 10 ? "0" + +item : +item;
  }).join(seprate);
};

exports.addZero = addZero;

var formatOption = function formatOption(option, disabledOptions) {
  var value = "" + option;

  if (option < 10) {
    value = "0" + option;
  }

  var disabled = false;

  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: value,
    disabled: disabled
  };
};

exports.formatOption = formatOption;

var scrollTo = function scrollTo(element, to, duration) {
  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10); // eslint-disable-line
  }; // jump to target if duration zero


  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }

  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;
  requestAnimationFrame(function () {
    element.scrollTop += perTick;

    if (element.scrollTop === to) {
      return;
    }

    scrollTo(element, to, duration - 10);
  });
};

exports.scrollTo = scrollTo;
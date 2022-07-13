"use strict";

exports.__esModule = true;
exports.moveToEnd = exports.commonRemoveProps = exports.fixControlledValue = exports.isMinLenError = exports.isMaxLenError = exports.handleErrorMessage = exports.defaultInputWidth = void 0;

var _commonTools = require("./commonTools");

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultInputWidth = 300;
exports.defaultInputWidth = defaultInputWidth;

var handleErrorMessage = function handleErrorMessage(props, needMinError, onlyStateError) {
  if (needMinError === void 0) {
    needMinError = true;
  }

  if (onlyStateError === void 0) {
    onlyStateError = false;
  }

  var maxLen = props.maxLen,
      minLen = props.minLen,
      isRequired = props.isRequired,
      requiredErrorMessage = props.requiredErrorMessage,
      maxLenErrorMessage = props.maxLenErrorMessage,
      minLenErrorMessage = props.minLenErrorMessage,
      value = props.value,
      _props$title = props.title,
      title = _props$title === void 0 ? '' : _props$title,
      errorMessage = props.errorMessage;

  if (errorMessage != null && !onlyStateError) {
    return errorMessage;
  }

  var valueLen = (0, _commonTools.getRealLength)(props, value);

  if (isRequired && !valueLen) {
    return requiredErrorMessage || "\u8BF7\u8F93\u5165" + title;
  }

  if (maxLen != null && valueLen > maxLen) {
    var overLen = valueLen - maxLen;
    return maxLenErrorMessage || "\u5DF2\u8D85\u51FA" + overLen + "\u4E2A\u5B57\u7B26";
  }

  if (needMinError && minLen != null && valueLen && valueLen < minLen) {
    return minLenErrorMessage || "\u6700\u5C11" + minLen + "\u4E2A\u5B57\u7B26";
  }

  if (onlyStateError) {
    return '';
  }

  return errorMessage;
};

exports.handleErrorMessage = handleErrorMessage;

var isMaxLenError = function isMaxLenError(_ref) {
  var value = _ref.value,
      maxLen = _ref.maxLen,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "maxLen"]);

  return maxLen != null && (0, _commonTools.getRealLength)(props, value) > maxLen;
};

exports.isMaxLenError = isMaxLenError;

var isMinLenError = function isMinLenError(_ref2) {
  var value = _ref2.value,
      minLen = _ref2.minLen,
      props = _objectWithoutPropertiesLoose(_ref2, ["value", "minLen"]);

  return minLen != null && (0, _commonTools.getRealLength)(props, value) < minLen;
};

exports.isMinLenError = isMinLenError;

var fixControlledValue = function fixControlledValue(value) {
  if (value == null) {
    return '';
  }

  return value;
};

exports.fixControlledValue = fixControlledValue;
var commonRemoveProps = ['maxLen', 'minLen', 'errorLocation', 'errorMessage', 'isRequired', 'requiredErrorMessage', 'maxLenErrorMessage', 'minLenErrorMessage', 'countMode', 'getLength'];
exports.commonRemoveProps = commonRemoveProps;

var moveToEnd = function moveToEnd(inputElement) {
  var inputElementLength = inputElement && inputElement.value && inputElement.value.length || 0;

  if (document && document.selection) {
    var inputRange = inputElement.createTextRange();
    inputRange.moveStart('character', inputElementLength);
    inputRange.collapse();
    inputRange.select();
  } else if (typeof inputElement.selectionStart === 'number' && typeof inputElement.selectionEnd === 'number') {
    inputElement.selectionStart = inputElementLength;
    inputElement.selectionEnd = inputElementLength;
  }
};

exports.moveToEnd = moveToEnd;
"use strict";

exports.__esModule = true;
exports.setTransform = exports.isTransform3dSupported = exports.getActiveIndex = exports.toChildrenArray = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var toChildrenArray = function toChildrenArray(children) {
  var childrens = [];

  _react["default"].Children.forEach(children, function (child) {
    if (child) {
      childrens.push(child);
    }
  });

  return childrens;
};

exports.toChildrenArray = toChildrenArray;

var getActiveIndex = function getActiveIndex(children, activeKey) {
  var c = toChildrenArray(children);

  for (var i = 0; i < c.length; i++) {
    if (c[i].key === activeKey) {
      return i;
    }
  }

  return -1;
};

exports.getActiveIndex = getActiveIndex;

var isTransform3dSupported = function isTransform3dSupported(style) {
  return ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob;
};

exports.isTransform3dSupported = isTransform3dSupported;

var setTransform = function setTransform(style, value) {
  style.transform = value;
  style.webkitTransform = value;
  style.mozTransform = value;
};

exports.setTransform = setTransform;
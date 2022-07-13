"use strict";

exports.__esModule = true;
exports.normalizeColumns = normalizeColumns;
exports.measureScrollbar = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px',
  overflow: 'scroll'
};

var measureScrollbar = function measureScrollbar(direction) {
  if (direction === void 0) {
    direction = 'vertical';
  }

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }

  var scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach(function (scrollProp) {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  document.body.appendChild(scrollDiv);
  var size = 0;

  if (direction === 'vertical') {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  } else if (direction === 'horizontal') {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
  }

  document.body.removeChild(scrollDiv);
  return size;
};

exports.measureScrollbar = measureScrollbar;

function normalizeColumns(elements) {
  var columns = [];

  _react["default"].Children.forEach(elements, function (element) {
    if (!_react["default"].isValidElement(element)) {
      return;
    }

    var column = _extends({}, element.props);

    if (element.key) {
      column.key = element.key;
    }

    if (element.type && element.type.__ONE_TABLE_COLUMN_GROUP) {
      column.children = normalizeColumns(column.children);
    }

    columns.push(column);
  });

  return columns;
}
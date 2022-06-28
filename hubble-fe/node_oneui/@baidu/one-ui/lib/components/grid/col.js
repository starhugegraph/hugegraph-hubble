"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var colSize = ['xs', 'sm', 'md', 'lg', 'xl'];

var stringOrNumber = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]);

var objectOrNumber = _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].number]);

var Col = function Col(props) {
  var _classNames;

  var span = props.span,
      order = props.order,
      offset = props.offset,
      push = props.push,
      pull = props.pull,
      className = props.className,
      children = props.children,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'new-fc-one-col' : _props$prefixCls,
      others = _objectWithoutPropertiesLoose(props, ["span", "order", "offset", "push", "pull", "className", "children", "prefixCls"]);

  var sizeClassObj = {};
  colSize.forEach(function (size) {
    var _extends2;

    var sizeProps = {};

    if (typeof props[size] === 'number') {
      sizeProps.span = props[size];
    } else if (typeof props[size] === 'object') {
      sizeProps = props[size] || {};
    }

    delete others[size];
    sizeClassObj = _extends({}, sizeClassObj, (_extends2 = {}, _extends2[prefixCls + "-" + size + "-" + sizeProps.span] = sizeProps.span !== undefined, _extends2[prefixCls + "-" + size + "-order-" + sizeProps.order] = sizeProps.order || sizeProps.order === 0, _extends2[prefixCls + "-" + size + "-offset-" + sizeProps.offset] = sizeProps.offset || sizeProps.offset === 0, _extends2[prefixCls + "-" + size + "-push-" + sizeProps.push] = sizeProps.push || sizeProps.push === 0, _extends2[prefixCls + "-" + size + "-pull-" + sizeProps.pull] = sizeProps.pull || sizeProps.pull === 0, _extends2));
  });
  var classes = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-" + span] = span !== undefined, _classNames[prefixCls + "-order-" + order] = order, _classNames[prefixCls + "-offset-" + offset] = offset, _classNames[prefixCls + "-push-" + push] = push, _classNames[prefixCls + "-pull-" + pull] = pull, _classNames), className, sizeClassObj);
  return _react["default"].createElement("div", _extends({}, others, {
    className: classes
  }), children);
};

Col.propTypes = {
  span: stringOrNumber,
  order: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber,
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  xl: objectOrNumber,
  prefixCls: _propTypes["default"].string
};
var _default = Col;
exports["default"] = _default;
module.exports = exports.default;
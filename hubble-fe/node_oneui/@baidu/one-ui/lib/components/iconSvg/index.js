"use strict";

exports.__esModule = true;
exports["default"] = IconSvg;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("omit.js"));

var _core = _interopRequireDefault(require("../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var iconSvgMap = _core["default"].iconSvg.iconSvgMap;

function IconSvg(props) {
  var _classNames;

  var type = props.type,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      prefixCls = props.prefixCls;
  var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + type] = true, _classNames), className);
  var Comp = iconSvgMap[type];

  if (!Comp) {
    return null;
  }

  return _react["default"].createElement(Comp, _extends({}, (0, _omit["default"])(props, ['type', 'prefixCls']), {
    className: classString
  }));
}

IconSvg.propTypes = {
  type: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string
};
IconSvg.defaultProps = {
  prefixCls: 'new-fc-one-icon-svg'
};
module.exports = exports.default;
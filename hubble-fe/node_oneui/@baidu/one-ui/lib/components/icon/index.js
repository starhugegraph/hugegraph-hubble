"use strict";

exports.__esModule = true;
exports["default"] = Icon;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Icon(props) {
  var _classNames;

  var type = props.type,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      spin = props.spin,
      prefixCls = props.prefixCls;
  var classString = (0, _classnames["default"])(prefixCls, 'anchor', (_classNames = {}, _classNames[prefixCls + "-spin"] = !!spin || type === 'loading', _classNames[prefixCls + "-" + type] = true, _classNames), className);
  return _react["default"].createElement("i", _extends({}, (0, _omit["default"])(props, ['type', 'spin', 'prefixCls']), {
    className: classString
  }));
}

Icon.propTypes = {
  type: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  title: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  spin: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  prefixCls: _propTypes["default"].string
};
Icon.defaultProps = {
  prefixCls: 'new-fc-one-icon'
};
module.exports = exports.default;
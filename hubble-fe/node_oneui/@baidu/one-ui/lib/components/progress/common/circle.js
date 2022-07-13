"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcProgress = require("rc-progress");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Circle = function Circle(props) {
  var prefixCls = props.prefixCls,
      percent = props.percent,
      strokeLinecap = props.strokeLinecap,
      strokeColor = props.strokeColor,
      strokeWidth = props.strokeWidth,
      width = props.width,
      trailColor = props.trailColor,
      children = props.children;
  var circleStyle = {
    width: width,
    height: width
  };
  return _react["default"].createElement("div", {
    className: prefixCls + "-inner",
    style: circleStyle
  }, _react["default"].createElement(_rcProgress.Circle, {
    percent: percent,
    strokeWidth: strokeWidth,
    trailWidth: strokeWidth,
    strokeColor: strokeColor,
    strokeLinecap: strokeLinecap,
    trailColor: trailColor,
    prefixCls: prefixCls
  }), children);
};

Circle.propTypes = {
  prefixCls: _propTypes["default"].string,
  percent: _propTypes["default"].number,
  strokeLinecap: _propTypes["default"].string,
  strokeColor: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  width: _propTypes["default"].number,
  trailColor: _propTypes["default"].string,
  children: _propTypes["default"].node
};
Circle.defaultProps = {
  prefixCls: 'new-fc-one-progress',
  percent: 0,
  strokeLinecap: 'round',
  strokeColor: '',
  strokeWidth: 0,
  width: 100,
  trailColor: '#eee'
};
var _default = Circle;
exports["default"] = _default;
module.exports = exports.default;
"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("./modal"));

var _confirm = _interopRequireDefault(require("./confirm"));

var _message = _interopRequireDefault(require("../message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

_modal["default"].confirm = function (props) {
  var config = _extends({
    type: 'confirm',
    okCancel: true,
    okType: 'primary',
    okText: '确定',
    cancelText: '取消',
    cancelType: 'normal'
  }, props);

  return (0, _confirm["default"])(config);
};

_modal["default"].alert = function (props) {
  var config = _extends({
    type: 'alert',
    okCancel: false,
    okType: 'primary',
    okText: '确定',
    buttonPosition: 'center',
    size: 'small'
  }, props);

  return (0, _confirm["default"])(config);
};

_modal["default"].message = _message["default"];
var _default = _modal["default"];
exports["default"] = _default;
module.exports = exports.default;
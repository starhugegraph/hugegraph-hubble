"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _radio = _interopRequireDefault(require("./radio"));

var _group = _interopRequireDefault(require("./group"));

exports.Group = _group["default"];

var _button = _interopRequireDefault(require("./button"));

exports.Button = _button["default"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 单选组件 button 为加强单选
 * @author shanqianmin
 * @date 2018/08/23
 */
_radio["default"].Button = _button["default"];
_radio["default"].Group = _group["default"];
var _default = _radio["default"];
exports["default"] = _default;
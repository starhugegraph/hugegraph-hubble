"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _group = _interopRequireDefault(require("./group"));

var _button = _interopRequireDefault(require("./button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 多选组件
 * @author shanqianmin
 * @date 2018/08/31
 */
_checkbox["default"].Button = _button["default"];
_checkbox["default"].Group = _group["default"];
var _default = _checkbox["default"];
exports["default"] = _default;
module.exports = exports.default;
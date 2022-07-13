"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _group = _interopRequireDefault(require("./group"));

var _tag = _interopRequireDefault(require("./tag"));

var _editableGroup = _interopRequireDefault(require("./editableGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_tag["default"].Group = _group["default"];
_tag["default"].EditableGroup = _editableGroup["default"];
var _default = _tag["default"];
exports["default"] = _default;
module.exports = exports.default;
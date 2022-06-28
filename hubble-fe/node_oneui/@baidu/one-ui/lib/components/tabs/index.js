"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _tabs = _interopRequireDefault(require("./tabs"));

var _tabPane = _interopRequireDefault(require("./tabPane"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_tabs["default"].TabPane = _tabPane["default"];
var _default = _tabs["default"];
exports["default"] = _default;
module.exports = exports.default;
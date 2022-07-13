"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _calendar = _interopRequireDefault(require("./calendar"));

var _formCalendar = _interopRequireDefault(require("./formCalendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_calendar["default"].FormCalendar = _formCalendar["default"];
var _default = _calendar["default"];
exports["default"] = _default;
module.exports = exports.default;
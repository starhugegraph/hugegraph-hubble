"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _datePicker = _interopRequireDefault(require("./datePicker"));

var _rangePicker = _interopRequireDefault(require("./rangePicker"));

var _monthPicker = _interopRequireDefault(require("./monthPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 日期选择器
 * @author huangshiming
 */
_datePicker["default"].RangePicker = _rangePicker["default"];
_datePicker["default"].MonthPicker = _monthPicker["default"];
var _default = _datePicker["default"];
exports["default"] = _default;
module.exports = exports.default;
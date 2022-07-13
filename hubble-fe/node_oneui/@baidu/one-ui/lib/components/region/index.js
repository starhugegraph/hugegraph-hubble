"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _region = _interopRequireDefault(require("./region"));

var _selectRegion = _interopRequireDefault(require("./selectRegion"));

var _singleRegion = _interopRequireDefault(require("./singleRegion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 地域组件
 * @author huangshiming
 */
_region["default"].SelectRegion = _selectRegion["default"];
_region["default"].SingleRegion = _singleRegion["default"];
var _default = _region["default"];
exports["default"] = _default;
module.exports = exports.default;
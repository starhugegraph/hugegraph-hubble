"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _row = _interopRequireDefault(require("./row"));

var _col = _interopRequireDefault(require("./col"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Row: _row["default"],
  Col: _col["default"]
};
exports["default"] = _default;
module.exports = exports.default;
"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _table = _interopRequireDefault(require("./table"));

var _column = _interopRequireDefault(require("./column"));

var _columnGroup = _interopRequireDefault(require("./columnGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_table["default"].Column = _column["default"];
_table["default"].ColumnGroup = _columnGroup["default"];
var _default = _table["default"];
exports["default"] = _default;
module.exports = exports.default;
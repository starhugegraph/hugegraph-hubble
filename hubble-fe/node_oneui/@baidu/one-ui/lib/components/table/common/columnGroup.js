"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColumnGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ColumnGroup, _Component);

  function ColumnGroup() {
    return _Component.apply(this, arguments) || this;
  }

  return ColumnGroup;
}(_react.Component);

exports["default"] = ColumnGroup;

_defineProperty(ColumnGroup, "isTableColumnGroup", true);

module.exports = exports.default;
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component } from 'react';

var ColumnGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ColumnGroup, _Component);

  function ColumnGroup() {
    return _Component.apply(this, arguments) || this;
  }

  return ColumnGroup;
}(Component);

_defineProperty(ColumnGroup, "isTableColumnGroup", true);

export { ColumnGroup as default };
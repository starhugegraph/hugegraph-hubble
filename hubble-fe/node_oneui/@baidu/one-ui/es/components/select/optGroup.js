function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

var OptGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(OptGroup, _React$Component);

  function OptGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  return OptGroup;
}(React.Component);

_defineProperty(OptGroup, "isSelectOptGroup", true);

export { OptGroup as default };
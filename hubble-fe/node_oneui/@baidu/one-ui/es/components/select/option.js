function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

var Option =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Option, _React$Component);

  function Option() {
    return _React$Component.apply(this, arguments) || this;
  }

  return Option;
}(React.Component);

_defineProperty(Option, "isSelectOption", true);

export { Option as default };
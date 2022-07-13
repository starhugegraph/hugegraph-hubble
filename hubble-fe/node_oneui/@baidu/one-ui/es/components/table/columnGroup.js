function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var ColumnGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ColumnGroup, _Component);

  function ColumnGroup() {
    return _Component.apply(this, arguments) || this;
  }

  return ColumnGroup;
}(Component);

_defineProperty(ColumnGroup, "__ONE_TABLE_COLUMN_GROUP", true);

_defineProperty(ColumnGroup, "propTypes", {
  /* eslint-disable react/no-unused-prop-types */
  title: PropTypes.node
});

export { ColumnGroup as default };
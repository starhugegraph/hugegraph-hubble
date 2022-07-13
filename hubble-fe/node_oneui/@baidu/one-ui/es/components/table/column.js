function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function */

var Column =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Column, _PureComponent);

  function Column() {
    return _PureComponent.apply(this, arguments) || this;
  }

  return Column;
}(PureComponent);

_defineProperty(Column, "propTypes", {
  title: PropTypes.node,
  key: PropTypes.string,
  dataIndex: PropTypes.string,
  render: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
    children: PropTypes.any
  })),
  onFilter: PropTypes.func,
  filterMultiple: PropTypes.bool,
  filterDropdown: PropTypes.node,
  filterDropdownVisible: PropTypes.bool,
  onFilterDropdownVisibleChange: PropTypes.func,
  sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  colSpan: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  fixed: PropTypes.oneOf(['left', 'right', true, false]),
  filterIcon: PropTypes.node,
  filteredValue: PropTypes.array,
  sortOrder: PropTypes.oneOf(['ascend', 'descend', true, false]),
  children: PropTypes.array,
  onCellClick: PropTypes.func,
  customOperate: PropTypes.array,
  customSortNode: PropTypes.node
});

export { Column as default };
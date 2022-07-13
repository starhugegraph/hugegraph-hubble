"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/prefer-stateless-function */
var Column =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Column, _PureComponent);

  function Column() {
    return _PureComponent.apply(this, arguments) || this;
  }

  return Column;
}(_react.PureComponent);

exports["default"] = Column;

_defineProperty(Column, "propTypes", {
  title: _propTypes["default"].node,
  key: _propTypes["default"].string,
  dataIndex: _propTypes["default"].string,
  render: _propTypes["default"].func,
  filters: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    text: _propTypes["default"].string,
    value: _propTypes["default"].string,
    children: _propTypes["default"].any
  })),
  onFilter: _propTypes["default"].func,
  filterMultiple: _propTypes["default"].bool,
  filterDropdown: _propTypes["default"].node,
  filterDropdownVisible: _propTypes["default"].bool,
  onFilterDropdownVisibleChange: _propTypes["default"].func,
  sorter: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),
  colSpan: _propTypes["default"].number,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  className: _propTypes["default"].string,
  fixed: _propTypes["default"].oneOf(['left', 'right', true, false]),
  filterIcon: _propTypes["default"].node,
  filteredValue: _propTypes["default"].array,
  sortOrder: _propTypes["default"].oneOf(['ascend', 'descend', true, false]),
  children: _propTypes["default"].array,
  onCellClick: _propTypes["default"].func,
  customOperate: _propTypes["default"].array,
  customSortNode: _propTypes["default"].node
});

module.exports = exports.default;
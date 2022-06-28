"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TableHeaderRow(_ref) {
  var row = _ref.row,
      index = _ref.index,
      height = _ref.height,
      components = _ref.components,
      onHeaderRow = _ref.onHeaderRow,
      prefixCls = _ref.prefixCls;
  var HeaderRow = components.header.row;
  var HeaderCell = components.header.cell;
  var rowProps = onHeaderRow(row.map(function (cell) {
    return cell.column;
  }), index);
  var customStyle = rowProps ? rowProps.style : {};

  var style = _extends({
    height: height
  }, customStyle);

  return _react["default"].createElement(HeaderRow, _extends({}, rowProps, {
    style: style
  }), row.map(function (cell, i) {
    var _classNames;

    var column = cell.column,
        cellProps = _objectWithoutPropertiesLoose(cell, ["column"]);

    var customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};

    if (column.align) {
      customProps.style = _extends({}, customProps.style, {
        textAlign: column.align
      });
    }

    var headerCellProps = _extends({}, cellProps, customProps);

    var hasIcon = headerCellProps.hasIcon;
    delete headerCellProps.hasIcon;
    headerCellProps.className = (0, _classnames["default"])(headerCellProps.className, (_classNames = {}, _classNames[prefixCls + "-cell-has-icon"] = hasIcon, _classNames));
    return _react["default"].createElement(HeaderCell, _extends({}, headerCellProps, {
      key: column.key || column.dataIndex || i
    }));
  }));
}

TableHeaderRow.propTypes = {
  row: _propTypes["default"].array,
  index: _propTypes["default"].number,
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  components: _propTypes["default"].any,
  onHeaderRow: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string
};

function getRowHeight(state, props) {
  var fixedColumnsHeadRowsHeight = state.fixedColumnsHeadRowsHeight;
  var columns = props.columns,
      rows = props.rows,
      fixed = props.fixed;
  var headerHeight = fixedColumnsHeadRowsHeight[0];

  if (!fixed) {
    return null;
  }

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }

    return headerHeight / rows.length;
  }

  return null;
}

var _default = (0, _miniStore.connect)(function (state, props) {
  return {
    height: getRowHeight(state, props)
  };
})(TableHeaderRow);

exports["default"] = _default;
module.exports = exports.default;
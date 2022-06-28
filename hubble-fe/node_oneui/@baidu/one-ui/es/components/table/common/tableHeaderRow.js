function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import classNames from 'classnames';

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

  return React.createElement(HeaderRow, _extends({}, rowProps, {
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
    headerCellProps.className = classNames(headerCellProps.className, (_classNames = {}, _classNames[prefixCls + "-cell-has-icon"] = hasIcon, _classNames));
    return React.createElement(HeaderCell, _extends({}, headerCellProps, {
      key: column.key || column.dataIndex || i
    }));
  }));
}

TableHeaderRow.propTypes = {
  row: PropTypes.array,
  index: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  components: PropTypes.any,
  onHeaderRow: PropTypes.func,
  prefixCls: PropTypes.string
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

export default connect(function (state, props) {
  return {
    height: getRowHeight(state, props)
  };
})(TableHeaderRow);
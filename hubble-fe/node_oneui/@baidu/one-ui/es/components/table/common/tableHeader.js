import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderRow from './tableHeaderRow';

function getHeaderRows(columns, currentRow, rows) {
  if (currentRow === void 0) {
    currentRow = 0;
  }

  rows = rows || [];
  rows[currentRow] = rows[currentRow] || [];
  columns.forEach(function (column) {
    if (column.rowSpan && rows.length < column.rowSpan) {
      while (rows.length < column.rowSpan) {
        rows.push([]);
      }
    }

    var cell = {
      key: column.key,
      className: column.className || '',
      children: column.title,
      hasIcon: column.hasIcon,
      column: column
    };

    if (column.children) {
      getHeaderRows(column.children, currentRow + 1, rows);
    }

    if ('colSpan' in column) {
      cell.colSpan = column.colSpan;
    }

    if ('rowSpan' in column) {
      cell.rowSpan = column.rowSpan;
    }

    if (cell.colSpan !== 0) {
      rows[currentRow].push(cell);
    }
  });
  return rows.filter(function (row) {
    return row.length > 0;
  });
}

export default function TableHeader(props, _ref) {
  var table = _ref.table;
  var components = table.components;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      showHeader = _table$props.showHeader,
      onHeaderRow = _table$props.onHeaderRow;
  var expander = props.expander,
      columns = props.columns,
      fixed = props.fixed;

  if (!showHeader) {
    return null;
  }

  var rows = getHeaderRows(columns);
  expander.renderExpandIndentCell(rows, fixed);
  var HeaderWrapper = components.header.wrapper;
  return React.createElement(HeaderWrapper, {
    className: prefixCls + "-thead"
  }, rows.map(function (row, index) {
    return React.createElement(TableHeaderRow, {
      key: index,
      index: index,
      fixed: fixed,
      columns: columns,
      rows: rows,
      row: row,
      components: components,
      onHeaderRow: onHeaderRow,
      prefixCls: prefixCls
    });
  }));
}
TableHeader.propTypes = {
  fixed: PropTypes.string,
  columns: PropTypes.array.isRequired,
  expander: PropTypes.object.isRequired
};
TableHeader.contextTypes = {
  table: PropTypes.any
};
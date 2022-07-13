function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import TableRow from './tableRow';
import tools from '../../../core';
var remove = tools.common.remove;

var ExpandableTable =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ExpandableTable, _PureComponent);

  function ExpandableTable(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleExpandChange", function (expanded, record, event, rowKey, destroy) {
      if (destroy === void 0) {
        destroy = false;
      }

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      var _this$props = _this.props,
          onExpandedRowsChange = _this$props.onExpandedRowsChange,
          onExpand = _this$props.onExpand;

      var _this$store$getState = _this.store.getState(),
          expandedRowKeys = _this$store$getState.expandedRowKeys;

      if (expanded) {
        // row was expaned
        expandedRowKeys = [].concat(expandedRowKeys, [rowKey]);
      } else {
        // row was collapse
        var expandedRowIndex = expandedRowKeys.indexOf(rowKey);

        if (expandedRowIndex !== -1) {
          expandedRowKeys = remove(expandedRowKeys, rowKey);
        }
      }

      if (!_this.props.expandedRowKeys) {
        _this.store.setState({
          expandedRowKeys: expandedRowKeys
        });
      }

      onExpandedRowsChange(expandedRowKeys);

      if (!destroy) {
        onExpand(expanded, record);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIndentCell", function (rows, fixed) {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          expandIconAsCell = _this$props2.expandIconAsCell,
          expandIconClassName = _this$props2.expandIconClassName,
          onClickExpandIcon = _this$props2.onClickExpandIcon;

      if (!expandIconAsCell || fixed === 'right' || !rows.length) {
        return;
      }

      var iconClassName = classNames(expandIconClassName, prefixCls + "-expand-icon-th");
      var iconColumn = {
        key: 'new-fc-one-table-expand-icon-cell',
        className: iconClassName,
        title: '',
        rowSpan: rows.length,
        onClick: onClickExpandIcon
      };
      rows[0].unshift(_extends({}, iconColumn, {
        column: iconColumn
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderRows", function (renderRows, rows, record, index, indent, fixed, parentKey, ancestorKeys) {
      var _this$props3 = _this.props,
          expandedRowClassName = _this$props3.expandedRowClassName,
          expandedRowRender = _this$props3.expandedRowRender,
          childrenColumnName = _this$props3.childrenColumnName;
      var childrenData = record[childrenColumnName];
      var nextAncestorKeys = [].concat(ancestorKeys, [parentKey]);
      var nextIndent = indent + 1;

      var _this$store$getState2 = _this.store.getState(),
          expandedRowKeys = _this$store$getState2.expandedRowKeys; // eslint-disable-next-line no-bitwise


      var expanded = !!~expandedRowKeys.indexOf(parentKey);
      var rowRender = expandedRowRender && expandedRowRender(record, index, nextIndent, expanded);

      if (expandedRowRender && rowRender) {
        rows.push(_this.renderExpandedRow(record, index, expandedRowRender, expandedRowClassName(record, index, indent), nextAncestorKeys, nextIndent, fixed));
      }

      if (childrenData) {
        rows.push.apply(rows, renderRows(childrenData, nextIndent, nextAncestorKeys));
      }
    });

    var data = props.data,
        _childrenColumnName = props.childrenColumnName,
        defaultExpandAllRows = props.defaultExpandAllRows,
        _expandedRowKeys = props.expandedRowKeys,
        defaultExpandedRowKeys = props.defaultExpandedRowKeys,
        getRowKey = props.getRowKey;
    var finnalExpandedRowKeys = [];

    var _rows = [].concat(data);

    if (defaultExpandAllRows) {
      for (var i = 0; i < _rows.length; i++) {
        var row = _rows[i];
        finnalExpandedRowKeys.push(getRowKey(row, i));
        _rows = _rows.concat(row[_childrenColumnName] || []);
      }
    } else {
      finnalExpandedRowKeys = _expandedRowKeys || defaultExpandedRowKeys;
    }

    _this.columnManager = props.columnManager;
    _this.store = props.store;

    _this.store.setState({
      expandedRowsHeight: {},
      expandedRowKeys: finnalExpandedRowKeys
    });

    return _this;
  }

  var _proto = ExpandableTable.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if ('expandedRowKeys' in this.props) {
      this.store.setState({
        expandedRowKeys: this.props.expandedRowKeys
      });
    }
  };

  _proto.renderExpandedRow = function renderExpandedRow(record, index, render, className, ancestorKeys, indent, fixed) {
    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        indentSize = _this$props4.indentSize,
        expandIconAsCell = _this$props4.expandIconAsCell;
    var parentKey = ancestorKeys[ancestorKeys.length - 1];
    var rowKey = parentKey + "-extra-row";
    var components = {
      body: {
        row: 'tr',
        cell: 'td'
      }
    };
    var colCount;

    if (fixed === 'left') {
      colCount = this.columnManager.leftLeafColumns().length;
    } else if (fixed === 'right') {
      colCount = this.columnManager.rightLeafColumns().length;
    } else {
      colCount = this.columnManager.leafColumns().length;
    }

    var _this$store$getState3 = this.store.getState(),
        expandedRowKeys = _this$store$getState3.expandedRowKeys; // eslint-disable-next-line no-bitwise


    var expanded = !!~expandedRowKeys.indexOf(parentKey);
    var rowRender = render(record, index, indent, expanded);
    var columns = [{
      key: 'extra-row',
      render: function render() {
        return {
          props: {
            colSpan: colCount + 1
          },
          children: fixed !== 'right' && rowRender ? rowRender : '&nbsp;'
        };
      }
    }];

    if (expandIconAsCell && fixed !== 'right') {
      columns.unshift({
        key: 'expand-icon-placeholder',
        render: function render() {
          return null;
        }
      });
    }

    return React.createElement(TableRow, {
      key: rowKey,
      columns: columns,
      className: className,
      rowKey: rowKey,
      ancestorKeys: ancestorKeys,
      prefixCls: prefixCls + "-expanded-row",
      indentSize: indentSize,
      indent: indent,
      fixed: fixed,
      components: components,
      expandedRow: true
    });
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        data = _this$props5.data,
        childrenColumnName = _this$props5.childrenColumnName,
        children = _this$props5.children;
    var needIndentSpaced = data.some(function (record) {
      return record[childrenColumnName];
    });
    return children({
      props: this.props,
      needIndentSpaced: needIndentSpaced,
      renderRows: this.renderRows,
      handleExpandChange: this.handleExpandChange,
      renderExpandIndentCell: this.renderExpandIndentCell
    });
  };

  return ExpandableTable;
}(PureComponent);

_defineProperty(ExpandableTable, "propTypes", {
  expandIconAsCell: PropTypes.bool,
  expandedRowKeys: PropTypes.array,
  expandedRowClassName: PropTypes.func,
  defaultExpandAllRows: PropTypes.bool,
  defaultExpandedRowKeys: PropTypes.array,
  expandedRowRender: PropTypes.func,
  childrenColumnName: PropTypes.string,
  indentSize: PropTypes.number,
  onExpand: PropTypes.func,
  onExpandedRowsChange: PropTypes.func,
  columnManager: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  prefixCls: PropTypes.string.isRequired,
  data: PropTypes.array,
  children: PropTypes.func.isRequired,
  getRowKey: PropTypes.func.isRequired,
  expandIconClassName: PropTypes.string,
  onClickExpandIcon: PropTypes.func
});

_defineProperty(ExpandableTable, "defaultProps", {
  expandIconAsCell: false,
  expandedRowClassName: function expandedRowClassName() {
    return '';
  },
  defaultExpandAllRows: false,
  defaultExpandedRowKeys: [],
  childrenColumnName: 'children',
  indentSize: 15,
  onExpand: function onExpand() {},
  onExpandedRowsChange: function onExpandedRowsChange() {},
  expandIconClassName: ''
});

polyfill(ExpandableTable);
export default connect()(ExpandableTable);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import ColGroup from './colGroup';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import ExpandableRow from './expandableRow';

var BaseTable =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BaseTable, _PureComponent);

  function BaseTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleRowHover", function (isHover, key) {
      _this.props.store.setState({
        currentHoverKey: isHover ? key : null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderRows", function (renderData, indent, ancestorKeys) {
      if (ancestorKeys === void 0) {
        ancestorKeys = [];
      }

      var table = _this.context.table;
      var columnManager = table.columnManager,
          components = table.components;
      var _table$props = table.props,
          prefixCls = _table$props.prefixCls,
          childrenColumnName = _table$props.childrenColumnName,
          rowClassName = _table$props.rowClassName,
          rowRef = _table$props.rowRef,
          onRowClick = _table$props.onRowClick,
          onRowDoubleClick = _table$props.onRowDoubleClick,
          onRowContextMenu = _table$props.onRowContextMenu,
          onRowMouseEnter = _table$props.onRowMouseEnter,
          onRowMouseLeave = _table$props.onRowMouseLeave,
          onRow = _table$props.onRow;
      var _this$props = _this.props,
          getRowKey = _this$props.getRowKey,
          fixed = _this$props.fixed,
          expander = _this$props.expander,
          isAnyColumnsFixed = _this$props.isAnyColumnsFixed;
      var rows = [];

      var _loop = function _loop(i) {
        var record = renderData[i];
        var key = getRowKey(record, i);
        var className = typeof rowClassName === 'string' ? rowClassName : rowClassName(record, i, indent);
        var onHoverProps = {};

        if (columnManager.isAnyColumnsFixed()) {
          onHoverProps.onHover = _this.handleRowHover;
        }

        var leafColumns = void 0;

        if (fixed === 'left') {
          leafColumns = columnManager.leftLeafColumns();
        } else if (fixed === 'right') {
          leafColumns = columnManager.rightLeafColumns();
        } else {
          leafColumns = columnManager.leafColumns();
        }

        var rowPrefixCls = prefixCls + "-row";
        var row = React.createElement(ExpandableRow, _extends({}, expander.props, {
          fixed: fixed,
          index: i,
          prefixCls: rowPrefixCls,
          record: record,
          key: key,
          rowKey: key,
          onRowClick: onRowClick,
          needIndentSpaced: expander.needIndentSpaced,
          onExpandedChange: expander.handleExpandChange,
          indent: indent
        }), function (expandableRow) {
          return React.createElement(TableRow, _extends({
            fixed: fixed,
            indent: indent,
            className: className,
            record: record,
            index: i,
            prefixCls: rowPrefixCls,
            childrenColumnName: childrenColumnName,
            columns: leafColumns,
            onRow: onRow,
            onRowDoubleClick: onRowDoubleClick,
            onRowContextMenu: onRowContextMenu,
            onRowMouseEnter: onRowMouseEnter,
            onRowMouseLeave: onRowMouseLeave
          }, onHoverProps, {
            rowKey: key,
            ancestorKeys: ancestorKeys,
            ref: rowRef(record, i, indent),
            components: components,
            isAnyColumnsFixed: isAnyColumnsFixed
          }, expandableRow));
        });
        rows.push(row);
        expander.renderRows(_this.renderRows, rows, record, i, indent, fixed, key, ancestorKeys);
      };

      for (var i = 0; i < renderData.length; i++) {
        _loop(i);
      }

      return rows;
    });

    return _this;
  }

  var _proto = BaseTable.prototype;

  _proto.render = function render() {
    var table = this.context.table;
    var components = table.components;
    var _table$props2 = table.props,
        prefixCls = _table$props2.prefixCls,
        scroll = _table$props2.scroll,
        data = _table$props2.data,
        getBodyWrapper = _table$props2.getBodyWrapper;
    var _this$props2 = this.props,
        expander = _this$props2.expander,
        tableClassName = _this$props2.tableClassName,
        hasHead = _this$props2.hasHead,
        hasBody = _this$props2.hasBody,
        fixed = _this$props2.fixed,
        columns = _this$props2.columns;
    var tableStyle = {};

    if (!fixed && scroll.x) {
      // not set width, then use content fixed width
      if (scroll.x === true) {
        tableStyle.tableLayout = 'fixed';
      } else {
        tableStyle.width = scroll.x;
      }
    }

    var Table = hasBody ? components.table : 'table';
    var BodyWrapper = components.body.wrapper;
    var body;

    if (hasBody) {
      body = React.createElement(BodyWrapper, {
        className: prefixCls + "-tbody"
      }, this.renderRows(data, 0));

      if (getBodyWrapper) {
        body = getBodyWrapper(body);
      }
    }

    return React.createElement(Table, {
      className: tableClassName,
      style: tableStyle,
      key: "table"
    }, React.createElement(ColGroup, {
      columns: columns,
      fixed: fixed
    }), hasHead && React.createElement(TableHeader, {
      expander: expander,
      columns: columns,
      fixed: fixed
    }), body);
  };

  return BaseTable;
}(PureComponent);

_defineProperty(BaseTable, "propTypes", {
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  columns: PropTypes.array.isRequired,
  tableClassName: PropTypes.string.isRequired,
  hasHead: PropTypes.bool.isRequired,
  hasBody: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  expander: PropTypes.object.isRequired,
  getRowKey: PropTypes.func,
  isAnyColumnsFixed: PropTypes.bool
});

_defineProperty(BaseTable, "contextTypes", {
  table: PropTypes.any
});

export default connect()(BaseTable);
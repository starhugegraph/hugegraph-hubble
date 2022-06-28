function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';
import TableCell from './tableCell';

var TableRow =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TableRow, _Component);

  function TableRow(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onRowClick", function (event) {
      var _this$props = _this.props,
          record = _this$props.record,
          index = _this$props.index,
          onRowClick = _this$props.onRowClick;

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRowDoubleClick", function (event) {
      var _this$props2 = _this.props,
          record = _this$props2.record,
          index = _this$props2.index,
          onRowDoubleClick = _this$props2.onRowDoubleClick;

      if (onRowDoubleClick) {
        onRowDoubleClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (event) {
      var _this$props3 = _this.props,
          record = _this$props3.record,
          index = _this$props3.index,
          onRowContextMenu = _this$props3.onRowContextMenu;

      if (onRowContextMenu) {
        onRowContextMenu(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (event) {
      var _this$props4 = _this.props,
          record = _this$props4.record,
          index = _this$props4.index,
          onRowMouseEnter = _this$props4.onRowMouseEnter,
          onHover = _this$props4.onHover,
          rowKey = _this$props4.rowKey;
      onHover(true, rowKey);

      if (onRowMouseEnter) {
        onRowMouseEnter(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (event) {
      var _this$props5 = _this.props,
          record = _this$props5.record,
          index = _this$props5.index,
          onRowMouseLeave = _this$props5.onRowMouseLeave,
          onHover = _this$props5.onHover,
          rowKey = _this$props5.rowKey;
      onHover(false, rowKey);

      if (onRowMouseLeave) {
        onRowMouseLeave(record, index, event);
      }
    });

    _this.shouldRender = props.visible;
    _this.state = {};
    return _this;
  }

  TableRow.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.visible || !prevState.visible && nextProps.visible) {
      return {
        shouldRender: true,
        visible: nextProps.visible
      };
    }

    return {
      visible: nextProps.visible
    };
  };

  var _proto = TableRow.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.state.shouldRender) {
      this.saveRowRef();
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !!(this.props.visible || nextProps.visible);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.state.shouldRender && !this.rowRef) {
      this.saveRowRef();
    }
  };

  _proto.setExpanedRowHeight = function setExpanedRowHeight() {
    var _extends2;

    var _this$props6 = this.props,
        store = _this$props6.store,
        rowKey = _this$props6.rowKey;

    var _store$getState = store.getState(),
        expandedRowsHeight = _store$getState.expandedRowsHeight;

    var height = this.rowRef.getBoundingClientRect().height;
    expandedRowsHeight = _extends({}, expandedRowsHeight, (_extends2 = {}, _extends2[rowKey] = height, _extends2));
    store.setState({
      expandedRowsHeight: expandedRowsHeight
    });
  };

  _proto.setRowHeight = function setRowHeight() {
    var _this$props7 = this.props,
        store = _this$props7.store,
        index = _this$props7.index;
    var fixedColumnsBodyRowsHeight = store.getState().fixedColumnsBodyRowsHeight.slice();
    var height = this.rowRef.getBoundingClientRect().height;
    fixedColumnsBodyRowsHeight[index] = height;
    store.setState({
      fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
    });
  };

  _proto.getStyle = function getStyle() {
    var _this$props8 = this.props,
        height = _this$props8.height,
        visible = _this$props8.visible;

    if (height && height !== this.style.height) {
      this.style = _extends({}, this.style, {
        height: height
      });
    }

    if (!visible && !this.style.display) {
      this.style = _extends({}, this.style, {
        display: 'none'
      });
    }

    return this.style;
  };

  _proto.saveRowRef = function saveRowRef() {
    this.rowRef = ReactDOM.findDOMNode(this);
    var _this$props9 = this.props,
        isAnyColumnsFixed = _this$props9.isAnyColumnsFixed,
        fixed = _this$props9.fixed,
        expandedRow = _this$props9.expandedRow,
        ancestorKeys = _this$props9.ancestorKeys;

    if (!isAnyColumnsFixed) {
      return;
    }

    if (!fixed && expandedRow) {
      this.setExpanedRowHeight();
    }

    if (!fixed && ancestorKeys.length >= 0) {
      this.setRowHeight();
    }
  };

  _proto.render = function render() {
    if (!this.state.shouldRender) {
      return null;
    }

    var _this$props10 = this.props,
        prefixCls = _this$props10.prefixCls,
        columns = _this$props10.columns,
        record = _this$props10.record,
        index = _this$props10.index,
        onRow = _this$props10.onRow,
        indent = _this$props10.indent,
        indentSize = _this$props10.indentSize,
        hovered = _this$props10.hovered,
        height = _this$props10.height,
        visible = _this$props10.visible,
        components = _this$props10.components,
        hasExpandIcon = _this$props10.hasExpandIcon,
        renderExpandIcon = _this$props10.renderExpandIcon,
        renderExpandIconCell = _this$props10.renderExpandIconCell,
        expanded = _this$props10.expanded;
    var BodyRow = components.body.row;
    var BodyCell = components.body.cell;
    var className = this.props.className;

    if (hovered) {
      className += " " + prefixCls + "-hover";
    }

    var cells = [];
    renderExpandIconCell(cells);

    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      cells.push(React.createElement(TableCell, {
        prefixCls: prefixCls,
        record: record,
        indentSize: indentSize,
        indent: indent,
        index: index,
        column: column,
        key: column.key || column.dataIndex,
        expandIcon: hasExpandIcon(i) && renderExpandIcon(expanded),
        component: BodyCell
      }));
    }

    var rowClassName = (prefixCls + " " + className + " " + prefixCls + "-level-" + indent).trim();
    var rowProps = onRow(record, index);
    var customStyle = rowProps ? rowProps.style : {};
    var style = {
      height: height
    };

    if (!visible) {
      style.display = 'none';
    }

    style = _extends({}, style, customStyle);
    return React.createElement(BodyRow, _extends({
      onClick: this.onRowClick,
      onDoubleClick: this.onRowDoubleClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onContextMenu: this.onContextMenu,
      className: rowClassName
    }, rowProps, {
      style: style
    }), cells);
  };

  return TableRow;
}(Component);

_defineProperty(TableRow, "propTypes", {
  onRow: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
  onRowContextMenu: PropTypes.func,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  onHover: PropTypes.func,
  columns: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  index: PropTypes.number,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  hasExpandIcon: PropTypes.func,
  hovered: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  renderExpandIcon: PropTypes.func,
  renderExpandIconCell: PropTypes.func,
  components: PropTypes.any,
  expandedRow: PropTypes.bool,
  isAnyColumnsFixed: PropTypes.bool,
  ancestorKeys: PropTypes.array.isRequired,
  expanded: PropTypes.bool
});

_defineProperty(TableRow, "defaultProps", {
  onRow: function onRow() {},
  onHover: function onHover() {},
  hasExpandIcon: function hasExpandIcon() {},
  renderExpandIcon: function renderExpandIcon() {},
  renderExpandIconCell: function renderExpandIconCell() {}
});

function getRowHeight(state, props) {
  var expandedRowsHeight = state.expandedRowsHeight,
      fixedColumnsBodyRowsHeight = state.fixedColumnsBodyRowsHeight;
  var fixed = props.fixed,
      index = props.index,
      rowKey = props.rowKey;

  if (!fixed) {
    return null;
  }

  if (expandedRowsHeight[rowKey]) {
    return expandedRowsHeight[rowKey];
  }

  if (fixedColumnsBodyRowsHeight[index]) {
    return fixedColumnsBodyRowsHeight[index];
  }

  return null;
}

polyfill(TableRow);
export default connect(function (state, props) {
  var currentHoverKey = state.currentHoverKey,
      expandedRowKeys = state.expandedRowKeys;
  var rowKey = props.rowKey,
      ancestorKeys = props.ancestorKeys; // eslint-disable-next-line no-bitwise

  var visible = ancestorKeys.length === 0 || ancestorKeys.every(function (k) {
    return ~expandedRowKeys.indexOf(k);
  });
  return {
    visible: visible,
    hovered: currentHoverKey === rowKey,
    height: getRowHeight(state, props)
  };
})(TableRow);
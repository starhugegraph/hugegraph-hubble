function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import ExpandIcon from './expandIcon';

var ExpandableRow =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ExpandableRow, _PureComponent);

  function ExpandableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "hasExpandIcon", function (columnIndex) {
      var expandRowByClick = _this.props.expandRowByClick;
      return !_this.expandIconAsCell && !expandRowByClick && columnIndex === _this.expandIconColumnIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpandChange", function (record, event) {
      var _this$props = _this.props,
          onExpandedChange = _this$props.onExpandedChange,
          expanded = _this$props.expanded,
          rowKey = _this$props.rowKey;

      if (_this.expandable) {
        onExpandedChange(!expanded, record, event, rowKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowClick", function (record, index, event) {
      var _this$props2 = _this.props,
          expandRowByClick = _this$props2.expandRowByClick,
          onRowClick = _this$props2.onRowClick;

      if (expandRowByClick) {
        _this.handleExpandChange(record, event);
      }

      if (onRowClick) {
        onRowClick(record, index, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIcon", function (newExpanded) {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          record = _this$props3.record,
          expanded = _this$props3.expanded,
          needIndentSpaced = _this$props3.needIndentSpaced;
      var currentExpanded = newExpanded || expanded;
      return React.createElement(ExpandIcon, {
        expandable: _this.expandable,
        prefixCls: prefixCls,
        onExpand: _this.handleExpandChange,
        needIndentSpaced: needIndentSpaced,
        expanded: currentExpanded,
        record: record
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderExpandIconCell", function (cells) {
      if (!_this.expandIconAsCell) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      cells.push(React.createElement("td", {
        className: prefixCls + "-expand-icon-cell",
        key: "new-fc-one-table-expand-icon-cell"
      }, _this.renderExpandIcon()));
    });

    return _this;
  }

  var _proto = ExpandableRow.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.handleDestroy();
  };

  _proto.handleDestroy = function handleDestroy() {
    var _this$props4 = this.props,
        onExpandedChange = _this$props4.onExpandedChange,
        rowKey = _this$props4.rowKey,
        record = _this$props4.record;

    if (this.expandable) {
      onExpandedChange(false, record, null, rowKey, true);
    }
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        childrenColumnName = _this$props5.childrenColumnName,
        expandedRowRender = _this$props5.expandedRowRender,
        indentSize = _this$props5.indentSize,
        record = _this$props5.record,
        fixed = _this$props5.fixed,
        expanded = _this$props5.expanded,
        index = _this$props5.index,
        indent = _this$props5.indent;
    this.expandIconAsCell = fixed !== 'right' ? this.props.expandIconAsCell : false;
    this.expandIconColumnIndex = fixed !== 'right' ? this.props.expandIconColumnIndex : -1;
    var childrenData = record[childrenColumnName]; // eslint-disable-next-line no-bitwise

    this.expandable = !!(childrenData || expandedRowRender && expandedRowRender(record, index, indent, expanded));
    var expandableRowProps = {
      indentSize: indentSize,
      onRowClick: this.handleRowClick,
      hasExpandIcon: this.hasExpandIcon,
      renderExpandIcon: this.renderExpandIcon,
      renderExpandIconCell: this.renderExpandIconCell,
      expanded: expanded
    };
    return this.props.children(expandableRowProps);
  };

  return ExpandableRow;
}(PureComponent);

_defineProperty(ExpandableRow, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  record: PropTypes.object.isRequired,
  indentSize: PropTypes.number,
  needIndentSpaced: PropTypes.bool.isRequired,
  expandRowByClick: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  expandIconAsCell: PropTypes.bool,
  expandIconColumnIndex: PropTypes.number,
  childrenColumnName: PropTypes.string,
  expandedRowRender: PropTypes.func,
  onExpandedChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  children: PropTypes.func.isRequired,
  indent: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
});

export default connect(function (_ref, _ref2) {
  var expandedRowKeys = _ref.expandedRowKeys;
  var rowKey = _ref2.rowKey;
  return {
    // eslint-disable-next-line no-bitwise
    expanded: !!~expandedRowKeys.indexOf(rowKey)
  };
})(ExpandableRow);
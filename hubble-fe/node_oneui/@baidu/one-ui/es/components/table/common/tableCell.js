function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function isInvalidRenderCellText(text) {
  return text && !React.isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
}

var TableCell =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TableCell, _PureComponent);

  function TableCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var _this$props = _this.props,
          record = _this$props.record,
          onCellClick = _this$props.column.onCellClick;

      if (onCellClick) {
        onCellClick(record, e);
      }
    });

    return _this;
  }

  var _proto = TableCell.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        record = _this$props2.record,
        indentSize = _this$props2.indentSize,
        prefixCls = _this$props2.prefixCls,
        indent = _this$props2.indent,
        index = _this$props2.index,
        expandIcon = _this$props2.expandIcon,
        column = _this$props2.column,
        BodyCell = _this$props2.component;
    var dataIndex = column.dataIndex,
        render = column.render,
        _column$className = column.className,
        className = _column$className === void 0 ? '' : _column$className; // We should return undefined if no dataIndex is specified, but in order to
    // be compatible with object-path's behavior, we return the record object instead.

    var text;

    if (typeof dataIndex === 'number') {
      text = _.get(record, dataIndex);
    } else if (!dataIndex || dataIndex.length === 0) {
      text = record;
    } else {
      text = _.get(record, dataIndex);
    }

    var tdProps = {};
    var colSpan;
    var rowSpan;

    if (render) {
      text = render(text, record, index);

      if (isInvalidRenderCellText(text)) {
        tdProps = text.props || tdProps;
        colSpan = tdProps.colSpan;
        rowSpan = tdProps.rowSpan;
        text = text.children;
      }
    }

    if (column.onCell) {
      tdProps = _extends({}, tdProps, column.onCell(record));
    }

    if (isInvalidRenderCellText(text)) {
      text = null;
    }

    var indentText = expandIcon ? React.createElement("span", {
      style: {
        paddingLeft: indentSize * indent + "px"
      },
      className: prefixCls + "-indent indent-level-" + indent
    }) : null;

    if (rowSpan === 0 || colSpan === 0) {
      return null;
    }

    if (column.align) {
      tdProps.style = _extends({}, tdProps.style, {
        textAlign: column.align
      });
    }

    return React.createElement(BodyCell, _extends({
      className: className,
      onClick: this.handleClick
    }, tdProps), indentText, expandIcon, text);
  };

  return TableCell;
}(PureComponent);

_defineProperty(TableCell, "propTypes", {
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  index: PropTypes.number,
  indent: PropTypes.number,
  indentSize: PropTypes.number,
  column: PropTypes.object,
  expandIcon: PropTypes.node,
  component: PropTypes.any
});

export { TableCell as default };
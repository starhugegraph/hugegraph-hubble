function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent, Children, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

var Row =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Row, _PureComponent);

  function Row() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        type = _this$props.type,
        justify = _this$props.justify,
        align = _this$props.align,
        className = _this$props.className,
        gutter = _this$props.gutter,
        style = _this$props.style,
        children = _this$props.children,
        _this$props$prefixCls = _this$props.prefixCls,
        prefixCls = _this$props$prefixCls === void 0 ? 'new-fc-one-row' : _this$props$prefixCls,
        others = _objectWithoutPropertiesLoose(_this$props, ["type", "justify", "align", "className", "gutter", "style", "children", "prefixCls"]);

    var classes = classNames((_classNames = {}, _classNames[prefixCls] = !type, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-" + type + "-" + justify] = type && justify, _classNames[prefixCls + "-" + type + "-" + align] = type && align, _classNames), className);
    var rowStyle = gutter > 0 ? _extends({
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    }, style) : style;
    var cols = Children.map(children, function (col) {
      if (!col) {
        return null;
      }

      if (col.props && gutter > 0) {
        return cloneElement(col, {
          style: _extends({
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          }, col.props.style)
        });
      }

      return col;
    });
    return React.createElement("div", _extends({}, others, {
      className: classes,
      style: rowStyle
    }), cols);
  };

  return Row;
}(PureComponent);

_defineProperty(Row, "propTypes", {
  /** 布局模式， 可选flex */
  type: PropTypes.string,

  /** flex布局模式下，垂直对齐的方式 */
  align: PropTypes.string,

  /** flex布局模式下，水平对齐的方式 */
  justify: PropTypes.string,

  /** 自定义row的类名 */
  className: PropTypes.string,

  /** row的children */
  children: PropTypes.node,

  /** 栅格间隔，类型是数字 */
  gutter: PropTypes.number,

  /** row的样式前缀 */
  prefixCls: PropTypes.string,

  /** 自定义row的样式 */
  style: PropTypes.object
});

_defineProperty(Row, "defaultProps", {
  gutter: 0
});

export { Row as default };
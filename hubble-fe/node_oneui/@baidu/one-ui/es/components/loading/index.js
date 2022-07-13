function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconLoading } from '@baidu/one-ui-icon';

var Loading =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Loading, _PureComponent);

  function Loading() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Loading.prototype;

  _proto.isNestedPattern = function isNestedPattern() {
    return !!(this.props && this.props.children);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        size = _this$props.size,
        loading = _this$props.loading,
        style = _this$props.style,
        tip = _this$props.tip,
        type = _this$props.type,
        children = _this$props.children,
        textDirection = _this$props.textDirection,
        CustomIconNode = _this$props.CustomIconNode;
    var classes = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-visible"] = loading, _classNames[prefixCls + "-show-text"] = !!tip, _classNames[prefixCls + "-type-" + type] = type, _classNames), prefixCls + "-" + textDirection, className);
    var loadingElement = React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement("div", {
      className: prefixCls + "-icon-element"
    }, CustomIconNode || React.createElement(IconLoading, {
      className: prefixCls + "-loading-icon"
    }), tip ? React.createElement("span", {
      className: prefixCls + "-text"
    }, tip) : null));

    if (this.isNestedPattern()) {
      var _classNames2;

      var containerClassName = classNames(prefixCls + "-container", (_classNames2 = {}, _classNames2[prefixCls + "-blur"] = loading, _classNames2));
      return React.createElement("div", {
        className: classNames(prefixCls + "-nested-loading")
      }, loading && React.createElement("div", null, loadingElement), React.createElement("div", {
        className: containerClassName
      }, children));
    }

    return loadingElement;
  };

  return Loading;
}(PureComponent);

_defineProperty(Loading, "propTypes", {
  /** 是否为loading状态 */
  loading: PropTypes.bool,

  /** 设置loading图标大小，可选值为 small large 或者不设 */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义类名 */
  className: PropTypes.string,

  /** loading时的文案 */
  tip: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  type: PropTypes.string,

  /** loading文案的方向 */
  textDirection: PropTypes.oneOf(['horizontal', 'vertical']),

  /** 自定义icon Node */
  CustomIconNode: PropTypes.node
});

_defineProperty(Loading, "defaultProps", {
  loading: true,
  prefixCls: 'new-fc-one-loading',
  className: '',
  size: 'medium',
  style: {},
  tip: '',
  type: 'normal',
  textDirection: 'horizontal',
  CustomIconNode: null
});

export { Loading as default };
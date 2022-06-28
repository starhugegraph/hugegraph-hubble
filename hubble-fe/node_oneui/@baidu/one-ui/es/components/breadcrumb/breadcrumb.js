function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconAngleRight } from '@baidu/one-ui-icon';

var Breadcrumb =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        separator = _this$props.separator,
        prefixCls = _this$props.prefixCls,
        style = _this$props.style,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        type = _this$props.type;
    var crumbs = React.Children.map(children, function (element, index) {
      if (!element) {
        return element;
      }

      return cloneElement(element, {
        separator: separator,
        key: index
      });
    });
    var breadcrumbCls = classNames(prefixCls, prefixCls + "-" + size, className, prefixCls + "-" + type);
    return React.createElement("div", {
      className: breadcrumbCls,
      style: style
    }, crumbs);
  };

  return Breadcrumb;
}(PureComponent);

_defineProperty(Breadcrumb, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: PropTypes.string,

  /**
   * 分割符
   */
  separator: PropTypes.node,

  /**
   * 自定义样式className
   */
  className: PropTypes.string,

  /**
   * 自定义样式
   */
  style: PropTypes.object,

  /**
   * children
   */
  children: PropTypes.node,
  size: PropTypes.oneOf(['medium', 'small']),
  type: PropTypes.oneOf(['normal', 'strong'])
});

_defineProperty(Breadcrumb, "defaultProps", {
  prefixCls: 'new-fc-one-breadcrumb',
  separator: React.createElement(IconAngleRight, null),
  size: 'medium',
  type: 'normal'
});

export { Breadcrumb as default };
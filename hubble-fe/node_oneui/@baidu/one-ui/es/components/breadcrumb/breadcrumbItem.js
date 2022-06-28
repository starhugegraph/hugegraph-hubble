function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconAngleRight } from '@baidu/one-ui-icon';

var BreadcrumbItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BreadcrumbItem, _PureComponent);

  function BreadcrumbItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        separator = _this$props.separator,
        children = _this$props.children,
        onClick = _this$props.onClick,
        disabled = _this$props.disabled,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "separator", "children", "onClick", "disabled"]);

    var link;
    var linkClassName = classNames((_classNames = {}, _classNames[prefixCls + "-link-disabled"] = disabled, _classNames[prefixCls + "-link"] = !disabled, _classNames));

    var linkProps = _extends({
      className: linkClassName
    }, restProps);

    if ('href' in this.props) {
      if (disabled) {
        /* eslint-disable no-script-url */
        linkProps.href = 'javascript:void(0)';
      }

      link = React.createElement("a", linkProps, children);
    } else {
      link = React.createElement("span", linkProps, children);
    }

    if (children) {
      return React.createElement("span", {
        onClick: onClick
      }, link, React.createElement("span", {
        className: prefixCls + "-separator"
      }, separator));
    }

    return null;
  };

  return BreadcrumbItem;
}(PureComponent);

_defineProperty(BreadcrumbItem, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: PropTypes.string,

  /**
   * 分隔符
   */
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * 跳转链接, 作用于a标签上
   */
  href: PropTypes.string,

  /**
   * breadcrumb的children
   */
  children: PropTypes.node,

  /**
   * 点击crumbItem的回调函数
   */
  onClick: PropTypes.func,
  disabled: PropTypes.bool
});

_defineProperty(BreadcrumbItem, "defaultProps", {
  prefixCls: 'new-fc-one-breadcrumb',
  separator: React.createElement(IconAngleRight, null),
  onClick: function onClick() {},
  disabled: false
});

export { BreadcrumbItem as default };
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

var MenuItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(MenuItem, _PureComponent);

  function MenuItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var inlineCollapsed = this.context.inlineCollapsed;
    var props = this.props;
    var children = props.children;

    var ItemProps = _extends({}, props);

    ItemProps.children = React.createElement("span", {
      className: props.rootPrefixCls + "-item-span"
    }, children);
    return React.createElement(Tooltip, {
      title: inlineCollapsed && props.level === 1 ? props.children : '',
      placement: "right",
      overlayClassName: props.rootPrefixCls + "-inline-collapsed-tooltip"
    }, React.createElement(Item, ItemProps));
  };

  return MenuItem;
}(PureComponent);

_defineProperty(MenuItem, "isMenuItem", true);

_defineProperty(MenuItem, "contextTypes", {
  inlineCollapsed: PropTypes.bool
});

export { MenuItem as default };
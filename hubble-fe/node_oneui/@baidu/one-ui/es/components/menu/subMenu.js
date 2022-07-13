function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
var sizeArray = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

var SubMenu =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SubMenu, _PureComponent);

  function SubMenu() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = SubMenu.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        placements = _this$props.placements,
        mode = _this$props.mode,
        rootPrefixCls = _this$props.rootPrefixCls,
        size = _this$props.size,
        popupClassName = _this$props.popupClassName,
        icon = _this$props.icon,
        title = _this$props.title;
    var alreadyHasSizeClassName = false;
    sizeArray.forEach(function (string) {
      if (popupClassName.indexOf(rootPrefixCls + "-submenu-" + string) > -1) {
        alreadyHasSizeClassName = true;
        return false;
      }
    });
    var newTitleNode = [title];
    var hasIcon = icon && React.isValidElement(icon);

    if (hasIcon) {
      newTitleNode.unshift(React.createElement("span", {
        className: rootPrefixCls + "-submenu-custom-icon"
      }, icon));
    }

    var props = _extends({}, this.props, {
      inlineIndent: 16,
      builtinPlacements: placements,
      expandIcon: mode !== 'vertical' ? React.createElement(Icon, {
        type: "angle-down"
      }) : React.createElement(Icon, {
        type: "angle-right"
      }),
      popupClassName: classNames(popupClassName, (_classNames = {}, _classNames[rootPrefixCls + "-submenu-" + size] = !!rootPrefixCls && !alreadyHasSizeClassName, _classNames)),
      className: classNames((_classNames2 = {}, _classNames2[rootPrefixCls + "-submenu-has-icon"] = mode === 'inline' && hasIcon, _classNames2)),
      title: newTitleNode
    });

    delete props.placements;
    delete props.icon;
    return React.createElement(RcSubMenu, props);
  };

  return SubMenu;
}(PureComponent);

_defineProperty(SubMenu, "propTypes", {
  rootPrefixCls: PropTypes.string,
  placements: PropTypes.object,
  theme: PropTypes.string,
  mode: PropTypes.string,
  popupClassName: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  icon: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
});

_defineProperty(SubMenu, "defaultProps", {
  placements: {},
  theme: 'light',
  popupClassName: '',
  size: 'medium'
});

_defineProperty(SubMenu, "isSubMenu", true);

export { SubMenu as default };
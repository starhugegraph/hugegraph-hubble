function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IconClose } from '@baidu/one-ui-icon';
import Button from '../../button';

var CardNode =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CardNode, _PureComponent);

  function CardNode() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = CardNode.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        size = _this$props.size,
        activeKey = _this$props.activeKey,
        currentKey = _this$props.currentKey,
        tab = _this$props.tab,
        Icon = _this$props.Icon,
        closable = _this$props.closable,
        disabled = _this$props.disabled,
        onClick = _this$props.onClick,
        onDelete = _this$props.onDelete;
    var tabClassName = classNames(prefixCls + "-title", (_classNames = {}, _classNames[prefixCls + "-title-is-active"] = activeKey && activeKey === currentKey, _classNames[prefixCls + "-title-is-inactive"] = !activeKey || activeKey !== currentKey, _classNames[prefixCls + "-title-disabled"] = disabled, _classNames[prefixCls + "-title-has-icon"] = Icon, _classNames[prefixCls + "-title-closable"] = closable, _classNames), [prefixCls + "-title-" + size]);
    var type = activeKey && activeKey === currentKey ? 'primary' : 'normal';
    return React.createElement(Button, {
      className: tabClassName,
      onClick: onClick,
      type: type,
      size: size,
      disabled: disabled
    }, Icon || null, React.createElement("span", {
      className: prefixCls + "-title-inline-text"
    }, tab), closable ? React.createElement(IconClose, {
      onClick: onDelete
    }) : null);
  };

  return CardNode;
}(PureComponent);

_defineProperty(CardNode, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']).isRequired,
  activeKey: PropTypes.string,
  currentKey: PropTypes.string,
  tab: PropTypes.node.isRequired,
  Icon: PropTypes.node,
  closable: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
});

_defineProperty(CardNode, "defaultProps", {
  Icon: null,
  closable: false,
  disabled: false
});

export { CardNode as default };
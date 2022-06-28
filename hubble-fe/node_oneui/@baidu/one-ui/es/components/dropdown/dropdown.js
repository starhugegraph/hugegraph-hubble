function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import CommonDropdown from './common/dropdown';
import Icon from '../icon';

var Dropdown =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Dropdown, _PureComponent);

  function Dropdown() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Dropdown.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var overlay = this.props.overlay;

    if (overlay) {
      var overlayProps = overlay.props;
      warning(!overlayProps.mode || overlayProps.mode === 'vertical', "mode=\"" + overlayProps.mode + "\" is not supported for Dropdown's Menu.");
    }
  };

  _proto.getTransitionName = function getTransitionName() {
    var _this$props = this.props,
        _this$props$placement = _this$props.placement,
        placement = _this$props$placement === void 0 ? '' : _this$props$placement,
        transitionName = _this$props.transitionName;

    if (transitionName !== undefined) {
      return transitionName;
    }

    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }

    return 'slide-up';
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        prefixCls = _this$props2.prefixCls,
        overlay = _this$props2.overlay,
        trigger = _this$props2.trigger,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        size = _this$props2.size;
    var child = React.Children.only(children);
    var overlayElement = React.Children.only(overlay);
    var dropdownTrigger = React.cloneElement(child, {
      className: classNames(child.props.className, prefixCls + "-trigger"),
      disabled: disabled
    }); // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly

    var _overlay$props = overlay.props,
        _overlay$props$select = _overlay$props.selectable,
        selectable = _overlay$props$select === void 0 ? false : _overlay$props$select,
        _overlay$props$focusa = _overlay$props.focusable,
        focusable = _overlay$props$focusa === void 0 ? true : _overlay$props$focusa;
    var expandIcon = React.createElement("span", {
      className: prefixCls + "-menu-submenu-arrow"
    }, React.createElement(Icon, {
      type: "angle-right",
      className: prefixCls + "-menu-submenu-arrow-icon"
    }));
    var fixedModeOverlay = typeof overlay.type === 'string' ? overlayElement : React.cloneElement(overlayElement, {
      mode: 'vertical',
      selectable: selectable,
      focusable: focusable,
      expandIcon: expandIcon,
      className: prefixCls + "-menu-" + size
    });
    var triggerActions = disabled ? [] : trigger;
    var alignPoint;

    if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
      alignPoint = true;
    }

    var overlayClassName = classNames(className, this.props.overlayClassName);
    return React.createElement(CommonDropdown, _extends({
      alignPoint: alignPoint
    }, this.props, {
      transitionName: this.getTransitionName(),
      trigger: triggerActions,
      overlay: fixedModeOverlay,
      overlayClassName: overlayClassName
    }), dropdownTrigger);
  };

  return Dropdown;
}(PureComponent);

_defineProperty(Dropdown, "propTypes", {
  /** 触发方式 */
  trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),

  /** 内部渲染的dom */
  overlay: PropTypes.node,

  /** 弹窗visible改变时触发 */
  onVisibleChange: PropTypes.func,

  /** 是否可见 */
  visible: PropTypes.bool,

  /** 是否禁用 */
  disabled: PropTypes.bool,

  /** dom挂载的位置 */
  getPopupContainer: PropTypes.func,

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义类名 */
  className: PropTypes.string,
  transitionName: PropTypes.string,

  /** 弹层位置 */
  placement: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
  children: PropTypes.object,

  /** 鼠标滑过延时 */
  mouseEnterDelay: PropTypes.number,

  /** 鼠标离开延时 */
  mouseLeaveDelay: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.object
});

_defineProperty(Dropdown, "defaultProps", {
  prefixCls: 'new-fc-one-dropdown',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  placement: 'bottomLeft',
  className: '',
  overlayClassName: '',
  size: 'small',
  overlayStyle: {}
});

export { Dropdown as default };
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconClose } from '@baidu/one-ui-icon';
import horizon from './horizon';
import Button from '../button';

var Embedded =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Embedded, _PureComponent);

  function Embedded(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        visible: false
      });

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", function () {
      var _this$props = _this.props,
          footer = _this$props.footer,
          onOk = _this$props.onOk,
          onCancel = _this$props.onCancel,
          okProps = _this$props.okProps,
          cancelProps = _this$props.cancelProps,
          okOrder = _this$props.okOrder,
          cancelOrder = _this$props.cancelOrder,
          buttonSize = _this$props.buttonSize,
          size = _this$props.size,
          okText = _this$props.okText,
          cancelText = _this$props.cancelText,
          hideDefaultFooter = _this$props.hideDefaultFooter;

      if (footer) {
        return footer;
      }

      var okStyle = okProps.style ? _extends({}, okProps.style, {
        order: okOrder
      }) : {
        order: okOrder
      };
      var cancelStyle = cancelProps.style ? _extends({}, cancelProps.style, {
        order: cancelOrder
      }) : {
        order: cancelOrder
      };
      var defaultFooter = [React.createElement(Button, _extends({
        size: buttonSize || size,
        key: "confirm",
        onClick: onOk,
        type: "primary"
      }, okProps, {
        style: okStyle
      }), okText), React.createElement(Button, _extends({
        size: buttonSize || size,
        onClick: onCancel,
        key: "cancel",
        type: "normal"
      }, cancelProps, {
        style: cancelStyle
      }), cancelText)];
      return !hideDefaultFooter ? defaultFooter : null;
    });

    _this.state = {
      visible: true
    };
    return _this;
  }

  var _proto = Embedded.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        title = _this$props2.title,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        closable = _this$props2.closable,
        children = _this$props2.children,
        size = _this$props2.size,
        position = _this$props2.position;
    var visible = this.state.visible;

    if ('visible' in this.props) {
      visible = this.props.visible;
    }

    if (!visible) {
      return null;
    }

    var footer = this.renderFooter();
    var embeddedClassNames = classNames(prefixCls, className, prefixCls + "-" + size);
    return React.createElement("div", {
      className: embeddedClassNames
    }, closable ? React.createElement("span", {
      className: prefixCls + "-close",
      onClick: this.onClose
    }, React.createElement(IconClose, null)) : null, React.createElement("div", {
      className: prefixCls + "-header"
    }, title), React.createElement("div", {
      className: prefixCls + "-body"
    }, children), footer ? React.createElement("div", {
      className: prefixCls + "-footer " + prefixCls + "-" + position
    }, footer) : null);
  };

  return Embedded;
}(PureComponent);

_defineProperty(Embedded, "horizon", horizon);

_defineProperty(Embedded, "propTypes", {
  /** 面板关闭时触发 */
  onClose: PropTypes.func,

  /** 传入底部的button数组 */
  footer: PropTypes.array,

  /** 面板的标题 */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** 面板是否可以关闭 */
  closable: PropTypes.bool,

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义类名 */
  className: PropTypes.string,
  children: PropTypes.node,

  /** 面板是否可见 */
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okProps: PropTypes.object,
  cancelProps: PropTypes.object,
  okOrder: PropTypes.number,
  cancelOrder: PropTypes.number,

  /** 按钮的类型 */
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),
  size: PropTypes.oneOf(['small', 'medium']),
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hideDefaultFooter: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'center', 'right'])
});

_defineProperty(Embedded, "defaultProps", {
  footer: null,
  closable: true,
  prefixCls: 'new-fc-one-embedded',
  className: '',
  onOk: function onOk() {},
  onCancel: function onCancel() {},
  okProps: {},
  cancelProps: {},
  okOrder: 1,
  cancelOrder: 2,
  size: 'medium',
  okText: '确定',
  cancelText: '取消',
  hideDefaultFooter: true,
  position: 'left'
});

export { Embedded as default };
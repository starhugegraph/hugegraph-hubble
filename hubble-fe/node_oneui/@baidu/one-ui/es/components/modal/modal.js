function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { polyfill } from 'react-lifecycles-compat';
import { transSizeOfDefault } from '../../core/commonTools';
import Button from '../button';
import Dialog from './common/dialogWrapper';
var mousePosition;
var mousePositionEventBinded;
var widthSizeMap = {
  small: 400,
  medium: 600,
  large: 800
};

var Modal =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Modal, _PureComponent);

  function Modal(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (mousePositionEventBinded) {
        return;
      } // 只有点击事件支持从鼠标位置动画展开


      addEventListener(document.documentElement, 'click', function (e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        setTimeout(function () {
          mousePosition = null;
        }, 100);
      });
      mousePositionEventBinded = true;
    });

    _defineProperty(_assertThisInitialized(_this), "getWidthBySize", function () {
      var width = _this.props.width;

      if (widthSizeMap[width]) {
        return widthSizeMap[width];
      }

      return width;
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel(e);
      }

      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOk", function (e) {
      var onOk = _this.props.onOk;

      if (onOk) {
        onOk(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", function () {
      var _this$props = _this.props,
          okText = _this$props.okText,
          okType = _this$props.okType,
          cancelText = _this$props.cancelText,
          confirmLoading = _this$props.confirmLoading,
          okProps = _this$props.okProps,
          cancelProps = _this$props.cancelProps,
          okOrder = _this$props.okOrder,
          cancelOrder = _this$props.cancelOrder,
          size = _this$props.size,
          buttonPosition = _this$props.buttonPosition;
      var buttonSize = _this.props.buttonSize;
      buttonSize = buttonSize ? transSizeOfDefault(buttonSize, 'medium') : size;
      var okStyle = okOrder ? _extends({}, okProps.style || {}, {
        order: okOrder
      }) : _extends({}, okProps.style || {});
      var cancelStyle = cancelOrder ? _extends({}, cancelProps.style || {}, {
        order: cancelOrder
      }) : _extends({}, cancelProps.style || {});
      var confirmButton = React.createElement(Button, _extends({
        key: "confirm",
        type: okType,
        size: buttonSize,
        loading: confirmLoading,
        onClick: _this.handleOk
      }, okProps, {
        style: okStyle
      }), okText || '确定');
      var cancelButton = React.createElement(Button, _extends({
        key: "cancel",
        size: buttonSize,
        type: "normal",
        onClick: _this.handleCancel
      }, cancelProps, {
        style: cancelStyle
      }), cancelText || '取消');
      var defaultFooter = buttonPosition === 'right' ? [cancelButton, confirmButton] : [confirmButton, cancelButton];
      return defaultFooter;
    });

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        footer = _this$props2.footer,
        wrapClassName = _this$props2.wrapClassName,
        centered = _this$props2.centered,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        buttonPosition = _this$props2.buttonPosition,
        destroyOnClose = _this$props2.destroyOnClose,
        needCloseIcon = _this$props2.needCloseIcon,
        size = _this$props2.size,
        fullScreen = _this$props2.fullScreen,
        okOrder = _this$props2.okOrder,
        cancelOrder = _this$props2.cancelOrder,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["footer", "wrapClassName", "centered", "className", "prefixCls", "buttonPosition", "destroyOnClose", "needCloseIcon", "size", "fullScreen", "okOrder", "cancelOrder"]);

    var visible = this.state.visible;
    var defaultFooter = this.renderFooter();
    var modalSize = transSizeOfDefault(this.props.size, 'medium');

    if (!visible && destroyOnClose) {
      // 关闭的时候销毁节点
      return null;
    }

    var wrapClass = classNames(prefixCls + "-" + buttonPosition, prefixCls + "-" + modalSize, (_classNames = {}, _classNames[prefixCls + "-centered"] = !!centered, _classNames[prefixCls + "-hide-close"] = !needCloseIcon, _classNames[prefixCls + "-full-screen"] = fullScreen, _classNames[prefixCls + "-order-reverse"] = okOrder && cancelOrder && cancelOrder < okOrder, _classNames[prefixCls + "-order-normal"] = okOrder && cancelOrder && cancelOrder > okOrder, _classNames), wrapClassName, className);
    return React.createElement(Dialog, _extends({}, restProps, {
      prefixCls: prefixCls,
      wrapClassName: wrapClass,
      width: this.getWidthBySize(),
      footer: footer === undefined ? defaultFooter : footer,
      visible: visible,
      mousePosition: mousePosition,
      onClose: this.handleCancel
    }));
  };

  return Modal;
}(PureComponent);

_defineProperty(Modal, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 弹窗是否可见 */
  visible: PropTypes.bool,

  /** confirm点击的时候是否需要loading */
  confirmLoading: PropTypes.bool,

  /** 弹窗标题 */
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),

  /** 弹窗点击按钮 */
  onOk: PropTypes.func,

  /** 弹窗点击取消 */
  onCancel: PropTypes.func,

  /** 弹窗关闭后触发 */
  afterClose: PropTypes.func,
  // width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** footer为一个数组，数组里面是button */
  footer: PropTypes.array,

  /** 确定按钮的文案 */
  okText: PropTypes.string,

  /** 确定按钮的type */
  okType: PropTypes.string,

  /** 取消的文案 */
  cancelText: PropTypes.string,

  /** 遮罩是否可以点击被关闭 */
  maskClosable: PropTypes.bool,

  /** 自定义style */
  style: PropTypes.object,

  /** 弹窗的类名自定义 */
  wrapClassName: PropTypes.string,
  className: PropTypes.string,

  /** 弹窗挂载的位置 */
  getContainer: PropTypes.func,

  /** 弹窗的z-index */
  zIndex: PropTypes.number,

  /** 弹窗的尺寸 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /** 按钮的类型 */
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),

  /** 弹窗是否居中显示 */
  centered: PropTypes.bool,

  /** 关闭以后弹窗是否销毁 */
  destroyOnClose: PropTypes.bool,

  /** 是否支持键盘esc关闭 */
  keyboard: PropTypes.bool,

  /** 是否展示遮罩 */
  mask: PropTypes.bool,

  /** 遮罩样式 */
  maskStyle: PropTypes.object,

  /** 按钮的位置 */
  buttonPosition: PropTypes.oneOf(['left', 'center', 'right']),

  /** 是否需要close的Icon */
  needCloseIcon: PropTypes.bool,
  okProps: PropTypes.object,
  cancelProps: PropTypes.object,

  /** 确定 取消 按钮的order */
  okOrder: PropTypes.number,
  cancelOrder: PropTypes.number,

  /** 弹窗宽度 */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fullScreen: PropTypes.bool
});

_defineProperty(Modal, "defaultProps", {
  prefixCls: 'new-fc-one-modal',
  size: 'medium',
  confirmLoading: false,
  visible: false,
  okType: 'primary',
  centered: true,
  destroyOnClose: false,
  mask: true,
  maskClosable: false,
  buttonPosition: 'left',
  footer: undefined,
  needCloseIcon: true,
  okProps: {},
  cancelProps: {},
  width: 'medium',
  fullScreen: false
});

_defineProperty(Modal, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('visible' in nextProps && nextProps.visible !== prevState.visible) {
    return {
      visible: nextProps.visible
    };
  }

  return null;
});

polyfill(Modal);
export default Modal;
"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _commonTools = require("../../core/commonTools");

var _button = _interopRequireDefault(require("../button"));

var _dialogWrapper = _interopRequireDefault(require("./common/dialogWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


      (0, _addEventListener["default"])(document.documentElement, 'click', function (e) {
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
      buttonSize = buttonSize ? (0, _commonTools.transSizeOfDefault)(buttonSize, 'medium') : size;
      var okStyle = okOrder ? _extends({}, okProps.style || {}, {
        order: okOrder
      }) : _extends({}, okProps.style || {});
      var cancelStyle = cancelOrder ? _extends({}, cancelProps.style || {}, {
        order: cancelOrder
      }) : _extends({}, cancelProps.style || {});

      var confirmButton = _react["default"].createElement(_button["default"], _extends({
        key: "confirm",
        type: okType,
        size: buttonSize,
        loading: confirmLoading,
        onClick: _this.handleOk
      }, okProps, {
        style: okStyle
      }), okText || '确定');

      var cancelButton = _react["default"].createElement(_button["default"], _extends({
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
    var modalSize = (0, _commonTools.transSizeOfDefault)(this.props.size, 'medium');

    if (!visible && destroyOnClose) {
      // 关闭的时候销毁节点
      return null;
    }

    var wrapClass = (0, _classnames["default"])(prefixCls + "-" + buttonPosition, prefixCls + "-" + modalSize, (_classNames = {}, _classNames[prefixCls + "-centered"] = !!centered, _classNames[prefixCls + "-hide-close"] = !needCloseIcon, _classNames[prefixCls + "-full-screen"] = fullScreen, _classNames[prefixCls + "-order-reverse"] = okOrder && cancelOrder && cancelOrder < okOrder, _classNames[prefixCls + "-order-normal"] = okOrder && cancelOrder && cancelOrder > okOrder, _classNames), wrapClassName, className);
    return _react["default"].createElement(_dialogWrapper["default"], _extends({}, restProps, {
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
}(_react.PureComponent);

_defineProperty(Modal, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 弹窗是否可见 */
  visible: _propTypes["default"].bool,

  /** confirm点击的时候是否需要loading */
  confirmLoading: _propTypes["default"].bool,

  /** 弹窗标题 */
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),

  /** 弹窗点击按钮 */
  onOk: _propTypes["default"].func,

  /** 弹窗点击取消 */
  onCancel: _propTypes["default"].func,

  /** 弹窗关闭后触发 */
  afterClose: _propTypes["default"].func,
  // width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** footer为一个数组，数组里面是button */
  footer: _propTypes["default"].array,

  /** 确定按钮的文案 */
  okText: _propTypes["default"].string,

  /** 确定按钮的type */
  okType: _propTypes["default"].string,

  /** 取消的文案 */
  cancelText: _propTypes["default"].string,

  /** 遮罩是否可以点击被关闭 */
  maskClosable: _propTypes["default"].bool,

  /** 自定义style */
  style: _propTypes["default"].object,

  /** 弹窗的类名自定义 */
  wrapClassName: _propTypes["default"].string,
  className: _propTypes["default"].string,

  /** 弹窗挂载的位置 */
  getContainer: _propTypes["default"].func,

  /** 弹窗的z-index */
  zIndex: _propTypes["default"].number,

  /** 弹窗的尺寸 */
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),

  /** 按钮的类型 */
  buttonSize: _propTypes["default"].oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),

  /** 弹窗是否居中显示 */
  centered: _propTypes["default"].bool,

  /** 关闭以后弹窗是否销毁 */
  destroyOnClose: _propTypes["default"].bool,

  /** 是否支持键盘esc关闭 */
  keyboard: _propTypes["default"].bool,

  /** 是否展示遮罩 */
  mask: _propTypes["default"].bool,

  /** 遮罩样式 */
  maskStyle: _propTypes["default"].object,

  /** 按钮的位置 */
  buttonPosition: _propTypes["default"].oneOf(['left', 'center', 'right']),

  /** 是否需要close的Icon */
  needCloseIcon: _propTypes["default"].bool,
  okProps: _propTypes["default"].object,
  cancelProps: _propTypes["default"].object,

  /** 确定 取消 按钮的order */
  okOrder: _propTypes["default"].number,
  cancelOrder: _propTypes["default"].number,

  /** 弹窗宽度 */
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  fullScreen: _propTypes["default"].bool
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

(0, _reactLifecyclesCompat.polyfill)(Modal);
var _default = Modal;
exports["default"] = _default;
module.exports = exports.default;
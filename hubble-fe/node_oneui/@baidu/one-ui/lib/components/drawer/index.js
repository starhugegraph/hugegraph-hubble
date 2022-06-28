"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReactContext = _interopRequireDefault(require("create-react-context"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _button = _interopRequireDefault(require("../button"));

var _drawerWrapper = _interopRequireDefault(require("./common/drawerWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawerContext = (0, _createReactContext["default"])(null);

var Drawer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Drawer, _Component);

  function Drawer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      if (prevProps.visible !== _this.props.visible && _this.parentDrawer) {
        if (_this.props.visible) {
          _this.parentDrawer.push();
        } else {
          _this.parentDrawer.pull();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMaskClick", function (e) {
      if (!_this.props.maskClosable) {
        return;
      }

      _this.close(e);
    });

    _defineProperty(_assertThisInitialized(_this), "getDestoryOnClose", function () {
      return _this.props.destroyOnClose && !_this.props.visible;
    });

    _defineProperty(_assertThisInitialized(_this), "getPushTransform", function (placement) {
      if (placement === 'left' || placement === 'right') {
        return "translateX(" + (placement === 'left' ? 180 : -180) + "px)";
      }

      if (placement === 'top' || placement === 'bottom') {
        return "translateY(" + (placement === 'top' ? 180 : -180) + "px)";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getRcDrawerStyle", function () {
      var _this$props = _this.props,
          zIndex = _this$props.zIndex,
          placement = _this$props.placement,
          maskStyle = _this$props.maskStyle;
      return _this.state.push ? _extends({}, maskStyle, {
        zIndex: zIndex,
        transform: _this.getPushTransform(placement)
      }) : _extends({}, maskStyle, {
        zIndex: zIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function (e) {
      if (_this.props.visible !== undefined) {
        if (_this.props.onClose) {
          _this.props.onClose(e);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "push", function () {
      _this.setState({
        push: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pull", function () {
      _this.setState({
        push: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderBody", function () {
      var _classNames;

      var isDestroyOnClose = _this.getDestoryOnClose();

      if (isDestroyOnClose) {
        return null;
      }

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          title = _this$props2.title,
          closable = _this$props2.closable,
          footer = _this$props2.footer,
          placement = _this$props2.placement,
          onOk = _this$props2.onOk,
          onCancel = _this$props2.onCancel,
          okText = _this$props2.okText,
          cancelText = _this$props2.cancelText,
          okProps = _this$props2.okProps,
          cancelProps = _this$props2.cancelProps,
          hideDefaultFooter = _this$props2.hideDefaultFooter,
          size = _this$props2.size;
      var containerStyle = placement === 'left' || placement === 'right' ? {
        overflow: 'auto',
        height: '100%'
      } : {};

      if (isDestroyOnClose) {
        // Increase the opacity transition, delete children after closing.
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }

      var header;

      if (title) {
        header = _react["default"].createElement("div", {
          className: prefixCls + "-header"
        }, _react["default"].createElement("div", {
          className: prefixCls + "-header-container"
        }, _react["default"].createElement("div", {
          className: prefixCls + "-title"
        }, title)));
      } // is have closer button


      var closer;

      if (closable) {
        closer = _react["default"].createElement("span", {
          className: prefixCls + "-close",
          onClick: _this.close
        }, _react["default"].createElement(_oneUiIcon.IconClose, null));
      }

      var drawerFooter = !hideDefaultFooter ? [_react["default"].createElement(_button["default"], _extends({
        key: "confirm",
        type: "primary",
        size: size,
        onClick: onOk
      }, okProps), okText), _react["default"].createElement(_button["default"], _extends({
        key: "cancel",
        onClick: onCancel,
        size: size
      }, cancelProps), cancelText)] : null;

      if (footer && footer.length) {
        drawerFooter = footer;
      }

      var footerDom = null;

      if (drawerFooter) {
        footerDom = _react["default"].createElement("div", {
          className: prefixCls + "-footer"
        }, drawerFooter);
      }

      var bodyClassName = (0, _classnames["default"])(prefixCls + "-body", (_classNames = {}, _classNames[prefixCls + "-body-" + placement] = true, _classNames[prefixCls + "-body-has-footer"] = footer && footer.length, _classNames));
      var drawerBodyClass = (0, _classnames["default"])(prefixCls + "-wrapper-body", prefixCls + "-wrapper-body-" + size);
      return _react["default"].createElement("div", {
        className: drawerBodyClass,
        style: containerStyle
      }, _react["default"].createElement("div", {
        className: prefixCls + "-wrapper-body-container"
      }, header, closer, _react["default"].createElement("div", {
        className: bodyClassName,
        style: _this.props.style
      }, _this.props.children), footerDom));
    });

    _defineProperty(_assertThisInitialized(_this), "renderProvider", function (value) {
      var _this$props3 = _this.props,
          zIndex = _this$props3.zIndex,
          style = _this$props3.style,
          placement = _this$props3.placement,
          className = _this$props3.className,
          width = _this$props3.width,
          height = _this$props3.height,
          visible = _this$props3.visible,
          mask = _this$props3.mask,
          destroyOnClose = _this$props3.destroyOnClose,
          closable = _this$props3.closable,
          title = _this$props3.title,
          cancelProps = _this$props3.cancelProps,
          okProps = _this$props3.okProps,
          okText = _this$props3.okText,
          cancelText = _this$props3.cancelText,
          onOk = _this$props3.onOk,
          onCancel = _this$props3.onCancel,
          hideDefaultFooter = _this$props3.hideDefaultFooter,
          footer = _this$props3.footer,
          rest = _objectWithoutPropertiesLoose(_this$props3, ["zIndex", "style", "placement", "className", "width", "height", "visible", "mask", "destroyOnClose", "closable", "title", "cancelProps", "okProps", "okText", "cancelText", "onOk", "onCancel", "hideDefaultFooter", "footer"]);

      var haveMask = mask ? '' : 'no-mask';
      _this.parentDrawer = value;
      var offsetStyle = {};

      if (placement === 'left' || placement === 'right') {
        offsetStyle.width = width;
      } else {
        offsetStyle.height = height;
      }

      return _react["default"].createElement(DrawerContext.Provider, {
        value: _assertThisInitialized(_this)
      }, _react["default"].createElement(_drawerWrapper["default"], _extends({
        level: null,
        handler: false
      }, rest, offsetStyle, {
        open: visible,
        onClose: _this.onMaskClick,
        showMask: mask,
        placement: placement,
        style: _this.getRcDrawerStyle(),
        className: (0, _classnames["default"])(className, haveMask)
      }), _this.renderBody()));
    });

    _this.state = {
      push: false
    };
    return _this;
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    return _react["default"].createElement(DrawerContext.Consumer, null, this.renderProvider);
  };

  return Drawer;
}(_react.Component);

exports["default"] = Drawer;

_defineProperty(Drawer, "propTypes", {
  /** 是否允许关闭 */
  closable: _propTypes["default"].bool,

  /** 关闭时候是否销毁 */
  destroyOnClose: _propTypes["default"].bool,

  /** 挂载的dom */
  getContainer: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].bool]),

  /** 外层遮罩是否可点击关闭 */
  maskClosable: _propTypes["default"].bool,

  /** 是否有遮罩 */
  mask: _propTypes["default"].bool,

  /** 遮罩的style */
  maskStyle: _propTypes["default"].object,

  /** 自定义draw的style */
  style: _propTypes["default"].object,

  /** draw的标题 */
  title: _propTypes["default"].node,

  /** 是否可见 */
  visible: _propTypes["default"].bool,

  /** draw的宽度 */
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** z-index层级 */
  zIndex: _propTypes["default"].number,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 弹出的位置 */
  placement: _propTypes["default"].string,

  /** 关闭时触发 */
  onClose: _propTypes["default"].func,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** drawer的children */
  children: _propTypes["default"].node,

  /** drawer的高度 */
  height: _propTypes["default"].number,

  /** 传入底部按钮 */
  footer: _propTypes["default"].array,
  hideDefaultFooter: _propTypes["default"].bool,

  /** 仅仅对默认footer生效 */
  onOk: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  okText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  cancelText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  okProps: _propTypes["default"].object,
  cancelProps: _propTypes["default"].object,
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Drawer, "defaultProps", {
  prefixCls: 'new-fc-one-drawer',
  width: 400,
  height: 256,
  closable: true,
  placement: 'right',
  maskClosable: true,
  mask: true,
  footer: null,
  hideDefaultFooter: true,
  onOk: function onOk() {},
  onCancel: function onCancel() {},
  okText: '确定',
  cancelText: '取消',
  okProps: {},
  cancelProps: {},
  size: 'small'
});

module.exports = exports.default;
"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _PortalWrapper = _interopRequireDefault(require("rc-util/lib/PortalWrapper"));

var React = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _drawerChild = _interopRequireDefault(require("./drawerChild"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawerWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DrawerWrapper, _React$Component);

  function DrawerWrapper(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onHandleClick", function (e) {
      var _this$props = _this.props,
          onHandleClick = _this$props.onHandleClick,
          $open = _this$props.open;

      if (onHandleClick) {
        onHandleClick(e);
      }

      if (typeof $open === 'undefined') {
        var open = _this.state.open;

        _this.setState({
          open: !open
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function (e) {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          open = _this$props2.open;

      if (onClose) {
        onClose(e);
      }

      if (typeof open === 'undefined') {
        _this.setState({
          open: false
        });
      }
    });

    var _open = typeof props.open !== 'undefined' ? props.open : !!props.defaultOpen;

    _this.state = {
      open: _open
    };
    return _this;
  }

  var _proto = DrawerWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        defaultOpen = _this$props3.defaultOpen,
        getContainer = _this$props3.getContainer,
        wrapperClassName = _this$props3.wrapperClassName,
        forceRender = _this$props3.forceRender,
        handler = _this$props3.handler,
        props = _objectWithoutPropertiesLoose(_this$props3, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]);

    var open = this.state.open; // 渲染在当前 dom 里；

    if (!getContainer) {
      return React.createElement("div", {
        className: wrapperClassName,
        ref: function ref(c) {
          _this2.dom = c;
        }
      }, React.createElement(_drawerChild["default"], _extends({}, props, {
        open: open,
        handler: handler,
        getContainer: function getContainer() {
          return _this2.dom;
        },
        onClose: this.onClose,
        onHandleClick: this.onHandleClick
      })));
    } // 如果有 handler 为内置强制渲染；


    var $forceRender = !!handler || forceRender;
    return React.createElement(_PortalWrapper["default"], {
      visible: open,
      forceRender: $forceRender,
      getContainer: getContainer,
      wrapperClassName: wrapperClassName
    }, function (_ref) {
      var visible = _ref.visible,
          afterClose = _ref.afterClose,
          rest = _objectWithoutPropertiesLoose(_ref, ["visible", "afterClose"]);

      return (// react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
        React.createElement(_drawerChild["default"], _extends({}, props, rest, {
          open: visible !== undefined ? visible : open,
          afterVisibleChange: afterClose !== undefined ? afterClose : props.afterVisibleChange,
          handler: handler,
          onClose: _this2.onClose,
          onHandleClick: _this2.onHandleClick
        }))
      );
    });
  };

  return DrawerWrapper;
}(React.Component);

_defineProperty(DrawerWrapper, "propTypes", {
  prefixCls: _propTypes["default"].string,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  open: _propTypes["default"].bool,
  defaultOpen: _propTypes["default"].bool,
  handler: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].bool]),
  placement: _propTypes["default"].oneOf(['left', 'top', 'right', 'bottom']),
  level: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  duration: _propTypes["default"].string,
  ease: _propTypes["default"].string,
  showMask: _propTypes["default"].bool,
  maskClosable: _propTypes["default"].bool,
  maskStyle: _propTypes["default"].object,
  drawerStyle: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  afterVisibleChange: _propTypes["default"].func,
  onHandleClick: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  keyboard: _propTypes["default"].bool,
  wrapperClassName: _propTypes["default"].string,
  forceRender: _propTypes["default"].bool,
  getContainer: _propTypes["default"].func,
  className: _propTypes["default"].string
});

_defineProperty(DrawerWrapper, "defaultProps", {
  prefixCls: 'new-fc-one-drawer',
  placement: 'left',
  getContainer: function getContainer() {
    return document.body;
  },
  defaultOpen: false,
  level: 'all',
  duration: '.3s',
  ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  onChange: function onChange() {},
  afterVisibleChange: function afterVisibleChange() {},
  handler: React.createElement("div", {
    className: "drawer-handle"
  }, React.createElement("i", {
    className: "drawer-handle-icon"
  })),
  showMask: true,
  maskClosable: true,
  maskStyle: {},
  wrapperClassName: '',
  className: '',
  keyboard: true,
  forceRender: false
});

_defineProperty(DrawerWrapper, "getDerivedStateFromProps", function (props, _ref2) {
  var prevProps = _ref2.prevProps;
  var newState = {
    prevProps: props
  };

  if (typeof prevProps !== 'undefined' && props.open !== prevProps.open) {
    newState.open = props.open;
  }

  return newState;
});

var _default = (0, _reactLifecyclesCompat.polyfill)(DrawerWrapper);

exports["default"] = _default;
module.exports = exports.default;
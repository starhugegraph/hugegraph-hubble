"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _horizon = _interopRequireDefault(require("./horizon"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var defaultFooter = [_react["default"].createElement(_button["default"], _extends({
        size: buttonSize || size,
        key: "confirm",
        onClick: onOk,
        type: "primary"
      }, okProps, {
        style: okStyle
      }), okText), _react["default"].createElement(_button["default"], _extends({
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
    var embeddedClassNames = (0, _classnames["default"])(prefixCls, className, prefixCls + "-" + size);
    return _react["default"].createElement("div", {
      className: embeddedClassNames
    }, closable ? _react["default"].createElement("span", {
      className: prefixCls + "-close",
      onClick: this.onClose
    }, _react["default"].createElement(_oneUiIcon.IconClose, null)) : null, _react["default"].createElement("div", {
      className: prefixCls + "-header"
    }, title), _react["default"].createElement("div", {
      className: prefixCls + "-body"
    }, children), footer ? _react["default"].createElement("div", {
      className: prefixCls + "-footer " + prefixCls + "-" + position
    }, footer) : null);
  };

  return Embedded;
}(_react.PureComponent);

exports["default"] = Embedded;

_defineProperty(Embedded, "horizon", _horizon["default"]);

_defineProperty(Embedded, "propTypes", {
  /** 面板关闭时触发 */
  onClose: _propTypes["default"].func,

  /** 传入底部的button数组 */
  footer: _propTypes["default"].array,

  /** 面板的标题 */
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),

  /** 面板是否可以关闭 */
  closable: _propTypes["default"].bool,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,

  /** 面板是否可见 */
  visible: _propTypes["default"].bool,
  onOk: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  okProps: _propTypes["default"].object,
  cancelProps: _propTypes["default"].object,
  okOrder: _propTypes["default"].number,
  cancelOrder: _propTypes["default"].number,

  /** 按钮的类型 */
  buttonSize: _propTypes["default"].oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),
  size: _propTypes["default"].oneOf(['small', 'medium']),
  okText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  cancelText: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  hideDefaultFooter: _propTypes["default"].bool,
  position: _propTypes["default"].oneOf(['left', 'center', 'right'])
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

module.exports = exports.default;
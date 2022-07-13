"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Popover =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Popover, _Component);

  function Popover() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "saveTooltip", function (node) {
      _this.tooltip = node;
    });

    return _this;
  }

  var _proto = Popover.prototype;

  _proto.getPopupDomNode = function getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  };

  _proto.getOverlay = function getOverlay() {
    var _this$props = this.props,
        title = _this$props.title,
        prefixCls = _this$props.prefixCls,
        content = _this$props.content;
    return _react["default"].createElement("div", null, title && _react["default"].createElement("div", {
      className: prefixCls + "-title"
    }, title), content && _react["default"].createElement("div", {
      className: prefixCls + "-inner-content"
    }, content));
  };

  _proto.render = function render() {
    var props = _extends({}, this.props);

    delete props.title;
    return _react["default"].createElement(_tooltip["default"], _extends({}, props, {
      ref: this.saveTooltip,
      overlay: this.getOverlay()
    }));
  };

  return Popover;
}(_react.Component);

exports["default"] = Popover;

_defineProperty(Popover, "propTypes", {
  /** popOver的标题 */
  title: _propTypes["default"].node,

  /** popOver的内容 */
  content: _propTypes["default"].node,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 弹出位置 */
  placement: _propTypes["default"].string,
  transitionName: _propTypes["default"].string,

  /** 触发模式 */
  trigger: _propTypes["default"].string,

  /** 鼠标滑入延时 */
  mouseEnterDelay: _propTypes["default"].number,

  /** 鼠标滑出延时 */
  mouseLeaveDelay: _propTypes["default"].number,

  /** 自定义内嵌样式 */
  overlayStyle: _propTypes["default"].object,

  /** visible 是否可见 */
  visible: _propTypes["default"].bool
});

_defineProperty(Popover, "defaultProps", {
  prefixCls: 'new-fc-one-popover',
  placement: 'bottom',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {}
});

module.exports = exports.default;
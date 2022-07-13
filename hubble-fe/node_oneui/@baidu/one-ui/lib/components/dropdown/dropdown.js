"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _dropdown = _interopRequireDefault(require("./common/dropdown"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      (0, _warning["default"])(!overlayProps.mode || overlayProps.mode === 'vertical', "mode=\"" + overlayProps.mode + "\" is not supported for Dropdown's Menu.");
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

    var child = _react["default"].Children.only(children);

    var overlayElement = _react["default"].Children.only(overlay);

    var dropdownTrigger = _react["default"].cloneElement(child, {
      className: (0, _classnames["default"])(child.props.className, prefixCls + "-trigger"),
      disabled: disabled
    }); // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly


    var _overlay$props = overlay.props,
        _overlay$props$select = _overlay$props.selectable,
        selectable = _overlay$props$select === void 0 ? false : _overlay$props$select,
        _overlay$props$focusa = _overlay$props.focusable,
        focusable = _overlay$props$focusa === void 0 ? true : _overlay$props$focusa;

    var expandIcon = _react["default"].createElement("span", {
      className: prefixCls + "-menu-submenu-arrow"
    }, _react["default"].createElement(_icon["default"], {
      type: "angle-right",
      className: prefixCls + "-menu-submenu-arrow-icon"
    }));

    var fixedModeOverlay = typeof overlay.type === 'string' ? overlayElement : _react["default"].cloneElement(overlayElement, {
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

    var overlayClassName = (0, _classnames["default"])(className, this.props.overlayClassName);
    return _react["default"].createElement(_dropdown["default"], _extends({
      alignPoint: alignPoint
    }, this.props, {
      transitionName: this.getTransitionName(),
      trigger: triggerActions,
      overlay: fixedModeOverlay,
      overlayClassName: overlayClassName
    }), dropdownTrigger);
  };

  return Dropdown;
}(_react.PureComponent);

exports["default"] = Dropdown;

_defineProperty(Dropdown, "propTypes", {
  /** 触发方式 */
  trigger: _propTypes["default"].arrayOf(_propTypes["default"].oneOf(['click', 'hover', 'contextMenu'])),

  /** 内部渲染的dom */
  overlay: _propTypes["default"].node,

  /** 弹窗visible改变时触发 */
  onVisibleChange: _propTypes["default"].func,

  /** 是否可见 */
  visible: _propTypes["default"].bool,

  /** 是否禁用 */
  disabled: _propTypes["default"].bool,

  /** dom挂载的位置 */
  getPopupContainer: _propTypes["default"].func,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,
  transitionName: _propTypes["default"].string,

  /** 弹层位置 */
  placement: _propTypes["default"].oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
  children: _propTypes["default"].object,

  /** 鼠标滑过延时 */
  mouseEnterDelay: _propTypes["default"].number,

  /** 鼠标离开延时 */
  mouseLeaveDelay: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large']),
  overlayClassName: _propTypes["default"].string,
  overlayStyle: _propTypes["default"].object
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

module.exports = exports.default;
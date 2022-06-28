"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _popSelectTrigger = _interopRequireDefault(require("../select/common/popSelectTrigger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopLayer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PopLayer, _PureComponent);

  function PopLayer(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      if ('visible' in nextProps) {
        _this.setState({
          visible: nextProps.visible
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var _classNames;

      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          disabled = _this$props.disabled,
          header = _this$props.header,
          size = _this$props.size;
      var visible = _this.state.visible;

      if (children) {
        return children;
      }

      var headerClassName = prefixCls + "-header";
      var classes = (0, _classnames["default"])(headerClassName, (_classNames = {}, _classNames[headerClassName + "-open"] = visible, _classNames[headerClassName + "-disabled"] = disabled, _classNames));
      return _react["default"].createElement("span", {
        className: classes
      }, _react["default"].createElement(_button["default"], {
        icon: _react["default"].createElement(_icon["default"], {
          type: "angle-down"
        }),
        size: size,
        disabled: disabled
      }, header));
    });

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  var _proto = PopLayer.prototype;

  _proto.render = function render() {
    var popLayerProps = _extends({}, this.props, {
      visible: this.state.visible,
      onVisibleChange: this.onVisibleChange
    });

    var children = this.renderHeader();
    return _react["default"].createElement(_popSelectTrigger["default"], popLayerProps, children);
  };

  return PopLayer;
}(_react.PureComponent);

exports["default"] = PopLayer;

_defineProperty(PopLayer, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: _propTypes["default"].string,

  /**
   * 触发方式，hover\click  默认hover
   */
  trigger: _propTypes["default"].string,

  /**
   * popLayer的children
   */
  children: _propTypes["default"].node,

  /**
   * 是否禁用，默认false
   */
  disabled: _propTypes["default"].bool,

  /**
   * 默认是否可视
   */
  visible: _propTypes["default"].bool,

  /**
   * 使用标准触发的按钮的文案
   */
  header: _propTypes["default"].string,

  /**
   * visibleChange的时候触发的函数
   */
  onVisibleChange: _propTypes["default"].func,

  /**
   * 禁止使用的原因
   */
  disabledReason: _propTypes["default"].string,

  /**
   * 是否展示禁止理由
   */
  showDisabledReason: _propTypes["default"].bool,

  /**
   * 使用让popLayer与按钮同宽
   */
  dropdownMatchSelectWidth: _propTypes["default"].bool,

  /**
   * popLayer 挂载的函数
   */
  getPopupContainer: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large'])
});

_defineProperty(PopLayer, "defaultProps", {
  prefixCls: 'new-fc-one-popLayer',
  trigger: 'hover',
  disabled: false,
  header: '',
  onVisibleChange: function onVisibleChange() {},
  disabledReason: '',
  showDisabledReason: false,
  dropdownMatchSelectWidth: true,
  size: 'medium'
});

module.exports = exports.default;
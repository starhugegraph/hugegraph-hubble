"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _placements = _interopRequireDefault(require("./placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dropdown =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Dropdown, _PureComponent);

  function Dropdown(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupDomNode", function () {
      return _this.trigger.getPopupDomNode();
    });

    _defineProperty(_assertThisInitialized(_this), "afterVisibleChange", function (visible) {
      if (visible && _this.getMinOverlayWidthMatchTrigger()) {
        var overlayNode = _this.getPopupDomNode();

        var rootNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

        if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
          overlayNode.style.minWidth = rootNode.offsetWidth + "px";

          if (_this.trigger && _this.trigger._component && _this.trigger._component.alignInstance) {
            _this.trigger._component.alignInstance.forceAlign();
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var overlayProps = _this.props.overlay.props; // do no call onVisibleChange, if you need click to hide, use onClick and control visible

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: false
        });
      }

      if (_this.props.onOverlayClick) {
        _this.props.onOverlayClick(e);
      }

      if (overlayProps.onClick) {
        overlayProps.onClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuElement", function () {
      var _this$props = _this.props,
          overlay = _this$props.overlay,
          prefixCls = _this$props.prefixCls;
      var extraOverlayProps = {
        prefixCls: prefixCls + "-menu",
        onClick: _this.onClick
      };

      if (typeof overlay.type === 'string') {
        delete extraOverlayProps.prefixCls;
      }

      return _react["default"].cloneElement(overlay, extraOverlayProps);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      _this.props.onVisibleChange(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "getMinOverlayWidthMatchTrigger", function () {
      var _this$props2 = _this.props,
          minOverlayWidthMatchTrigger = _this$props2.minOverlayWidthMatchTrigger,
          alignPoint = _this$props2.alignPoint;

      if ('minOverlayWidthMatchTrigger' in _this.props) {
        return minOverlayWidthMatchTrigger;
      }

      return !alignPoint;
    });

    var _visible = _this.props.visible || _this.props.defaultVisible;

    _this.state = {
      visible: _visible
    };
    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        children = _this$props3.children,
        transitionName = _this$props3.transitionName,
        animation = _this$props3.animation,
        align = _this$props3.align,
        placement = _this$props3.placement,
        getPopupContainer = _this$props3.getPopupContainer,
        showAction = _this$props3.showAction,
        hideAction = _this$props3.hideAction,
        overlayClassName = _this$props3.overlayClassName,
        overlayStyle = _this$props3.overlayStyle,
        trigger = _this$props3.trigger,
        dropdownMatchSelectWidth = _this$props3.dropdownMatchSelectWidth,
        otherProps = _objectWithoutPropertiesLoose(_this$props3, ["prefixCls", "children", "transitionName", "animation", "align", "placement", "getPopupContainer", "showAction", "hideAction", "overlayClassName", "overlayStyle", "trigger", "dropdownMatchSelectWidth"]);

    var triggerHideAction = hideAction;

    if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
      triggerHideAction = ['click'];
    }

    return _react["default"].createElement(_rcTrigger["default"], _extends({}, otherProps, {
      prefixCls: prefixCls,
      ref: this.saveTrigger,
      popupClassName: overlayClassName,
      popupStyle: overlayStyle,
      builtinPlacements: _placements["default"],
      action: trigger,
      showAction: showAction,
      hideAction: triggerHideAction || [],
      popupPlacement: placement,
      popupAlign: align,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      popupVisible: this.state.visible,
      afterPopupVisibleChange: this.afterVisibleChange,
      popup: this.getMenuElement(),
      onPopupVisibleChange: this.onVisibleChange,
      getPopupContainer: getPopupContainer
    }), children);
  };

  return Dropdown;
}(_react.PureComponent);

_defineProperty(Dropdown, "propTypes", {
  minOverlayWidthMatchTrigger: _propTypes["default"].bool,
  onVisibleChange: _propTypes["default"].func,
  onOverlayClick: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].any,
  transitionName: _propTypes["default"].string,
  overlayClassName: _propTypes["default"].string,
  animation: _propTypes["default"].any,
  align: _propTypes["default"].object,
  overlayStyle: _propTypes["default"].object,
  placement: _propTypes["default"].string,
  overlay: _propTypes["default"].node,
  trigger: _propTypes["default"].array,
  alignPoint: _propTypes["default"].bool,
  showAction: _propTypes["default"].array,
  hideAction: _propTypes["default"].array,
  getPopupContainer: _propTypes["default"].func,
  visible: _propTypes["default"].bool,
  defaultVisible: _propTypes["default"].bool,
  dropdownMatchSelectWidth: _propTypes["default"].bool
});

_defineProperty(Dropdown, "defaultProps", {
  trigger: ['hover'],
  showAction: [],
  overlayClassName: '',
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange: function onVisibleChange() {},
  placement: 'bottomLeft'
});

_defineProperty(Dropdown, "getDerivedStateFromProps", function (nextProps) {
  if ('visible' in nextProps) {
    return {
      visible: nextProps.visible
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Dropdown);
var _default = Dropdown;
exports["default"] = _default;
module.exports = exports.default;
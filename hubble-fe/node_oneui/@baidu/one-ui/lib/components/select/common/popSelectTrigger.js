"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _popContent = _interopRequireDefault(require("./popContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_rcTrigger["default"].displayName = 'Trigger';
var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};

var PopSelectTrigger =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(PopSelectTrigger, _Component);

  function PopSelectTrigger(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      var width = _reactDom["default"].findDOMNode(_assertThisInitialized(_this)).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupElement", function () {
      var _this$props = _this.props,
          overlay = _this$props.overlay,
          prefixCls = _this$props.prefixCls,
          id = _this$props.id;
      return _react["default"].createElement(_popContent["default"], {
        key: "content",
        trigger: _this.trigger,
        prefixCls: prefixCls,
        id: id,
        overlay: overlay
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    _this.state = {
      dropdownWidth: null
    };
    return _this;
  }

  var _proto = PopSelectTrigger.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

  _proto.getPopupDomNode = function getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        overlayClassName = _this$props2.overlayClassName,
        trigger = _this$props2.trigger,
        mouseEnterDelay = _this$props2.mouseEnterDelay,
        mouseLeaveDelay = _this$props2.mouseLeaveDelay,
        overlayStyle = _this$props2.overlayStyle,
        prefixCls = _this$props2.prefixCls,
        children = _this$props2.children,
        onVisibleChange = _this$props2.onVisibleChange,
        afterVisibleChange = _this$props2.afterVisibleChange,
        transitionName = _this$props2.transitionName,
        animation = _this$props2.animation,
        align = _this$props2.align,
        destroyPopUpOnHide = _this$props2.destroyPopUpOnHide,
        defaultVisible = _this$props2.defaultVisible,
        getPopUpContainer = _this$props2.getPopUpContainer,
        dropdownMatchSelectWidth = _this$props2.dropdownMatchSelectWidth,
        popupPlacement = _this$props2.popupPlacement,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "align", "destroyPopUpOnHide", "defaultVisible", "getPopUpContainer", "dropdownMatchSelectWidth", "popupPlacement"]);

    var extraProps = _extends({}, restProps);

    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }

    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

    var popupStyle = _extends({}, overlayStyle);

    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = this.state.dropdownWidth + "px";
    }

    return _react["default"].createElement(_rcTrigger["default"], _extends({
      popupClassName: overlayClassName,
      ref: this.saveTrigger,
      prefixCls: prefixCls,
      popup: this.getPopupElement,
      action: trigger,
      builtinPlacements: BUILT_IN_PLACEMENTS,
      popupPlacement: popupPlacement,
      popupAlign: align,
      getPopupContainer: getPopUpContainer,
      onPopupVisibleChange: onVisibleChange,
      afterPopupVisibleChange: afterVisibleChange,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      defaultPopupVisible: defaultVisible,
      destroyPopupOnHide: destroyPopUpOnHide,
      mouseLeaveDelay: mouseLeaveDelay,
      popupStyle: popupStyle,
      mouseEnterDelay: mouseEnterDelay
    }, extraProps), children);
  };

  return PopSelectTrigger;
}(_react.Component);

_defineProperty(PopSelectTrigger, "propTypes", {
  trigger: _propTypes["default"].any,
  children: _propTypes["default"].any,
  defaultVisible: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  transitionName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  animation: _propTypes["default"].any,
  onVisibleChange: _propTypes["default"].func,
  afterVisibleChange: _propTypes["default"].func,
  overlay: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]).isRequired,
  overlayStyle: _propTypes["default"].object,
  overlayClassName: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  mouseEnterDelay: _propTypes["default"].number,
  mouseLeaveDelay: _propTypes["default"].number,
  getPopUpContainer: _propTypes["default"].func,
  destroyPopUpOnHide: _propTypes["default"].bool,
  align: _propTypes["default"].object,
  id: _propTypes["default"].string,
  dropdownMatchSelectWidth: _propTypes["default"].bool,
  popupPlacement: _propTypes["default"].string
});

_defineProperty(PopSelectTrigger, "defaultProps", {
  prefixCls: 'new-fc-one-select-pop',
  mouseEnterDelay: 0,
  destroyPopUpOnHide: false,
  mouseLeaveDelay: 0.1,
  align: {},
  trigger: ['hover'],
  dropdownMatchSelectWidth: true,
  popupPlacement: 'bottomLeft'
});

var _default = PopSelectTrigger;
exports["default"] = _default;
PopSelectTrigger.displayName = 'PopSelectTrigger';
module.exports = exports.default;
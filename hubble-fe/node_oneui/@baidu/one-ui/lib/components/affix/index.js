"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _omit = _interopRequireDefault(require("omit.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _core = _interopRequireDefault(require("../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getScroll = _core["default"].affix.getScroll;

var getDefaultTarget = function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
};

var getTargetRect = function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    left: 0,
    bottom: 0
  };
};

var getOffset = function getOffset(element, target) {
  var elemRect = element.getBoundingClientRect();
  var targetRect = getTargetRect(target);
  var scrollTop = getScroll(target, true);
  var scrollLeft = getScroll(target, false);
  var docElem = window.document.body;
  var clientTop = docElem.clientTop || 0;
  var clientLeft = docElem.clientLeft || 0;
  return {
    top: elemRect.top - targetRect.top + (scrollTop - clientTop),
    left: elemRect.left - targetRect.left + (scrollLeft - clientLeft),
    width: elemRect.width,
    height: elemRect.height
  };
};

var noop = function noop() {};

var Affix =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Affix, _Component);

  function Affix(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "setTargetEventListeners", function (getTarget) {
      var target = getTarget();

      if (!target) {
        return;
      }

      _this.clearEventListeners();

      _this.events.forEach(function (eventName) {
        _this.eventHandlers[eventName] = (0, _addEventListener["default"])(target, eventName, _lodash["default"].throttle(_this.updatePosition, 10));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setAffixStyle", function (e, affixStyle) {
      var _this$props = _this.props,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? noop : _this$props$onChange,
          _this$props$target = _this$props.target,
          target = _this$props$target === void 0 ? getDefaultTarget : _this$props$target;
      var originalAffixStyle = _this.state.affixStyle;
      var isWindow = target() === window;

      if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
        return;
      }

      if ((0, _shallowequal["default"])(affixStyle, originalAffixStyle)) {
        return;
      }

      _this.setState({
        affixStyle: affixStyle
      }, function () {
        var affixed = !!_this.state.affixStyle;

        if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
          onChange(affixed);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPlaceholderStyle", function (placeholderStyle) {
      var originalPlaceholderStyle = _this.state.placeholderStyle;

      if ((0, _shallowequal["default"])(placeholderStyle, originalPlaceholderStyle)) {
        return;
      }

      _this.setState({
        placeholderStyle: placeholderStyle
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFixedNode", function (node) {
      _this.fixedNode = node;
    });

    _defineProperty(_assertThisInitialized(_this), "updatePosition", function (e) {
      var _this$props2 = _this.props,
          offsetBottom = _this$props2.offsetBottom,
          _this$props2$target = _this$props2.target,
          target = _this$props2$target === void 0 ? getDefaultTarget : _this$props2$target,
          zIndex = _this$props2.zIndex;
      var offsetTop = _this.props.offsetTop;
      var targetNode = target();
      var scrollTop = getScroll(targetNode, true);

      var affixNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var elemOffset = getOffset(affixNode, targetNode);
      var elemSize = {
        width: _this.fixedNode.offsetWidth,
        height: _this.fixedNode.offsetHeight
      };
      var offsetMode = {
        top: false,
        bottom: false
      };

      if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
        offsetMode.top = true;
        offsetTop = 0;
      } else {
        offsetMode.top = typeof offsetTop === 'number';
        offsetMode.bottom = typeof offsetBottom === 'number';
      }

      var targetRect = getTargetRect(targetNode);
      var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;

      if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
        // Fixed Top
        var width = elemOffset.width;

        _this.setAffixStyle(e, {
          position: 'fixed',
          top: targetRect.top + offsetTop,
          left: targetRect.left + elemOffset.left,
          width: width,
          zIndex: zIndex
        });

        _this.setPlaceholderStyle({
          width: width,
          height: elemSize.height
        });
      } else if (scrollTop < elemOffset.top + elemSize.height + (offsetBottom - targetInnerHeight) && offsetMode.bottom) {
        var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
        var _width = elemOffset.width;

        _this.setAffixStyle(e, {
          position: 'fixed',
          bottom: targetBottomOffet + offsetBottom,
          left: targetRect.left + elemOffset.left,
          width: _width,
          zIndex: zIndex
        });

        _this.setPlaceholderStyle({
          width: _width,
          height: elemOffset.height
        });
      } else {
        var affixStyle = _this.state.affixStyle;

        if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
          _this.setAffixStyle(e, _extends({}, affixStyle, {
            width: affixNode.offsetWidth
          }));
        } else {
          _this.setAffixStyle(e, null);
        }

        _this.setPlaceholderStyle(null);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "eventHandlers", {});

    _defineProperty(_assertThisInitialized(_this), "clearEventListeners", function () {
      _this.events.forEach(function (eventName) {
        var handler = _this.eventHandlers[eventName];

        if (handler && handler.remove) {
          handler.remove();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "events", ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load']);

    _this.state = {
      affixStyle: null,
      placeholderStyle: null
    };
    return _this;
  }

  var _proto = Affix.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var target = this.props.target || getDefaultTarget;
    this.timeout = setTimeout(function () {
      _this2.setTargetEventListeners(target);
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.target !== nextProps.target) {
      this.clearEventListeners();
      this.setTargetEventListeners(nextProps.target); // Mock Event object.

      this.updatePosition({});
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
  };

  _proto.render = function render() {
    var _classNames;

    var affixStyle = this.state.affixStyle;
    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style,
        children = _this$props3.children;
    var className = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls || 'new-fc-one-affix'] = affixStyle, _classNames));
    var props = (0, _omit["default"])(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'zIndex']);

    var placeholderStyle = _extends({}, this.state.placeholderStyle, style);

    return _react["default"].createElement("div", _extends({}, props, {
      style: placeholderStyle
    }), _react["default"].createElement("div", {
      className: className,
      ref: this.getFixedNode,
      style: affixStyle
    }, children));
  };

  return Affix;
}(_react.Component);

exports["default"] = Affix;

_defineProperty(Affix, "propTypes", {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop: _propTypes["default"].number,

  /** 距离窗口底部到达指定偏移量后触发 */
  offsetBottom: _propTypes["default"].number,

  /** 固定状态改变时触发的回调函数 */
  onChange: _propTypes["default"].func,

  /** 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target: _propTypes["default"].func,

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** dom的children */
  children: _propTypes["default"].node,

  /** 样式 */
  style: _propTypes["default"].object,

  /** 固钉的z-index */
  zIndex: _propTypes["default"].number
});

_defineProperty(Affix, "defaultProps", {
  zIndex: 1
});

module.exports = exports.default;